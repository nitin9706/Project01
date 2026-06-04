import fs from "fs/promises";
import path from "path";

import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { ApiError } from "../utility/ApiError.js";
import { cloneRepo } from "../service/Cloning.service.js";
import { zipFolder } from "../service/archive.service.js";
import {
  uploadToS3,
  checkS3FileExists,
  deleteFromS3,
} from "../utility/UploadingToS3.js";

const cloneProject = asyncHandler(async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    throw new ApiError(400, "Repository URL is required");
  }

  let repoPath = null;
  let zipPath = null;
  try {
    // clone repo
    const { path: clonedPath, id } = await cloneRepo(repoUrl);

    repoPath = clonedPath;

    // create archive
    zipPath = await zipFolder(clonedPath, `./Output/${id}.zip`);

    console.log(zipPath);

    // s3 key
    const s3Key = `archives/${id}.zip`;

    // upload archive
    const s3Url = await uploadToS3(zipPath, s3Key);

    return res.status(200).json(
      new ApiResponse(200, "Repository uploaded successfully", {
        success: true,

        id,

        archiveUrl: s3Url,
      }),
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

const checks3folder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // check if file exists in s3
  const s3Key = `archives/${id}.zip`;
  try {
    const s3Url = await checkS3FileExists(s3Key);
    if (!s3Url) {
      return res.status(404).json(
        new ApiResponse(404, "Archive not found in S3", {
          exists: false,
        }),
      );
    }
    return res.status(200).json(
      new ApiResponse(200, "Archive exists in S3", {
        exists: true,
        archiveUrl: s3Url,
      }),
    );
  } catch (error) {
    if (error.code === "NotFound") {
      return res.status(404).json(
        new ApiResponse(404, "Archive not found in S3", {
          exists: false,
        }),
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
    return res.status(200).json(
      new ApiResponse(200, "Archive deleted from S3", {
        success: true,
      }),
    );
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Error deleting archive from S3");
  }
});

export { cloneProject, checks3folder, deleteOnS3 };
