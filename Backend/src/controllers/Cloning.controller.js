import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { ApiError } from "../utility/ApiError.js";

import { cloneRepo } from "../Feature/Cloning Project/Cloning.service.js";
import { getAllFiles } from "../Feature/Cloning Project/FileArrMaker.js";
import { uploadToS3 } from "../Feature/Cloning Project/UploadingToS3.js";

import fs from "fs";
import pathModule from "path";

const cloneProject = asyncHandler(async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    new ApiError(400, "Repository URL is required");
  }

  // clone repo
  const { path, id } = await cloneRepo(repoUrl);

  // get all files
  const fileList = getAllFiles(path);

  // upload files
  for (const file of fileList) {
    // relative path
    const relativePath = pathModule.relative(path, file);

    // s3 key
    const s3Key = `cloned-repos/${id}/${relativePath}`;

    // upload
    const s3Url = await uploadToS3(file, s3Key);

    console.log(`File uploaded to S3: ${s3Url}`);

    // delete local file
    if (s3Url) {
      fs.unlinkSync(file);
    }
  }

  // delete empty repo folder
  fs.rmSync(path, { recursive: true, force: true });

  const folderUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/cloned-repos/${id}/`;
  return res.status(200).json(
    new ApiResponse(200, "Repository cloned and uploaded to S3 successfully", {
      id,
      folderUrl,
    }),
  );
});

export { cloneProject };
