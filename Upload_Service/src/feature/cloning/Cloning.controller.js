import fs from "fs/promises";

import { asyncHandler } from "../../utility/asyncHandler.js";
import { ApiResponse } from "../../utility/ApiResponse.js";
import { ApiError } from "../../utility/ApiError.js";
import { cloneRepo } from "../../service/Cloning.service.js";
import { zipFolder } from "../../service/archive.service.js";
import {
  uploadToS3,
  checkS3FileExists,
  deleteFromS3,
} from "../../utility/UploadingToS3.js";
import { triggerDeployment } from "../../service/redis.service.js";
import { Deployment } from "../deployment/deployment.model.js";
import { User } from "../Users/user.model.js";

const cloneProject = asyncHandler(async (req, res) => {
  const { repoUrl } = req.body;
  const userId = req.user.id;

  if (!repoUrl) {
    throw new ApiError(400, "Repository URL is required");
  }

  let repoPath = null;
  let zipPath = null;
  try {
    // clone repo
    const { cloneRepoPath, id, projectName } = await cloneRepo(repoUrl);

    repoPath = cloneRepoPath;

    // create archive
    zipPath = await zipFolder(cloneRepoPath, `./Output/${id}.zip`);

    console.log(zipPath);

    // creating the database entry when the zip uploaded to the s3

    const deploymentEntry = await Deployment.create({
      deploymentId: id,
      projectName: projectName || "",
      status: "queued",
      userId: userId,
      buildLogs: ["Cloning repository... "],
    });

    const deploymentDoc = await Deployment.findById(deploymentEntry._id);

    if (!deploymentDoc) {
      throw new ApiError(500, "DB Entry failed");
    }

    // s3 key
    const s3Key = `archives/${id}.zip`;

    // upload archive
    const s3Url = await uploadToS3(zipPath, s3Key);

    if (!s3Url) {
      throw new ApiError(400, `file not uploaded to s3 ${s3Url} , ${s3Key}`);
    }

    //  now we will push the cloneing status to the queue

    await triggerDeployment(id, s3Key, deploymentEntry);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          success: true,
          id,
          archiveUrl: s3Url,
          deploymentDoc,
        },
        "Repository uploaded successfully  and queued",
      ),
    );
  } catch (error) {
    console.error(error);

    throw error;
  } finally {
    // cleanup repo folder
    if (repoPath) {
      await fs.rm(repoPath, {
        recursive: true,
        force: true,
      });
    }

    // cleanup archive
    if (zipPath) {
      await fs.rm(zipPath, {
        force: true,
      });
    }
  }
});

const getAllProjects = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const allDeployments = await Deployment.find({ userId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, allDeployments, "Deployments fetched successfully"),
    );
});

const getAnyProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;

  const specificDeployment = await Deployment.findOne({
    _id: projectId,
    userId: req.user._id,
  });

  if (!specificDeployment) {
    throw new ApiError(404, "Invalid Deployment");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        specificDeployment,
        "Deployment fetched successfully",
      ),
    );
});

const deleteDeployment = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const userId = req.user._id;

  // Find deployment belonging to the logged-in user
  const deployment = await Deployment.findOne({
    _id: projectId,
    userId,
  });

  if (!deployment) {
    throw new ApiError(404, "Deployment not found");
  }

  // Delete files from S3 first
  await deleteFromS3(deployment.deploymentId);

  // Delete deployment from database
  await deployment.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, deployment, "Deployment deleted successfully"));
});

// test controllers
const checks3folder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // check if file exists in s3
  const s3Key = `archives/${id}.zip`;
  try {
    const s3Url = await checkS3FileExists(s3Key);
    if (!s3Url) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, { exists: false }, "Archive not found in S3"),
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { exists: true, archiveUrl: s3Url },
          "Archive exists in S3",
        ),
      );
  } catch (error) {
    if (error.code === "NotFound") {
      return res
        .status(404)
        .json(
          new ApiResponse(404, { exists: false }, "Archive not found in S3"),
        );
    }
    console.error(error);
    throw new ApiError(500, "Error checking S3 for archive");
  }
});

const deleteOnS3 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const s3Key = `archives/${id}.zip`;
  try {
    await deleteFromS3(s3Key);
    return res
      .status(200)
      .json(new ApiResponse(200, { success: true }, "Archive deleted from S3"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Error deleting archive from S3");
  }
});

export {
  cloneProject,
  checks3folder,
  deleteOnS3,
  getAllProjects,
  getAnyProject,
  deleteDeployment,
};
