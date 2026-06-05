import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { ApiError } from "../utility/apiError.js";

import { getZipFromS3 } from "../service/Download.service.js";
import { unzipFile } from "../service/unzip.service.js";
import { deployProject } from "../service/deploy.service.js";

import fs from "fs";
import path from "path";

const deployController = asyncHandler(async (req, res) => {
  const { bucketName, zipFileKey } = req.body;
  if (!bucketName || !zipFileKey) {
    throw new ApiError(400, "Bucket name and zip file key are required.");
  }

  try {
    // Step 1: Download the zip file from S3
    const zipFilePath = await getZipFromS3(bucketName, zipFileKey);

    // Step 2: Unzip the file
    const extractedPath = await unzipFile(zipFilePath, `./Deployment`);

    // check if the extracted path exists
    if (!extractedPath) {
      throw new ApiError(500, "Failed to extract the zip file.");
    }

    // now it will check that it has package.json file in the extracted path
    if (!fs.existsSync(path.join(extractedPath, "package.json"))) {
      throw new ApiError(
        400,
        "The extracted folder does not contain a package.json file.",
      );
    }

    const { deploymentId, url, deployedAt } = await deployProject(
      extractedPath,
      zipFileKey,
    );

    res.status(200).json(
      new ApiResponse(true, "Deployment successful", {
        deployedAt,
        deploymentId,
        url,
      }),
    );
  } catch (error) {
    console.error("Deployment failed:", error);
    throw new ApiError(500, "Deployment failed. Please try again later.");
  }
});

export { deployController };
