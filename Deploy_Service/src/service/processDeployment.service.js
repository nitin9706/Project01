import { getZipFromS3 } from "./download.service.js";
import { unzipFile } from "./unzip.service.js";
import { deployProject } from "./deploy.service.js";

import fs from "fs";
import path from "path";

export const processDeployment = async (
  deploymentId,
  zipFileKey,
  deploymentDoc,
) => {
  console.log(`getting the file from s3 started ${deploymentId}`);

  const zipFilePath = await getZipFromS3(zipFileKey);

  const extractedPath = await unzipFile(
    zipFilePath,
    path.join(`/Deployment`, `${deploymentId}`),
  );

  if (!extractedPath) {
    throw new Error("Failed to extract zip file");
  }

  if (!fs.existsSync(path.join(extractedPath, "package.json"))) {
    throw new Error(
      "The extracted folder does not contain a package.json file",
    );
  }

  return await deployProject(extractedPath, deploymentId, deploymentDoc);
};
