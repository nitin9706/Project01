import unzipper from "unzipper";
import fs from "fs";

export const unzipFile = async (zipFilePath, outputDir) => {
  try {
    await fs
      .createReadStream(zipFilePath)
      .pipe(unzipper.Extract({ path: outputDir }))
      .promise();
    console.log(`Unzipped ${zipFilePath} to ${outputDir}`);
    return outputDir;
  } catch (error) {
    console.error(`Error unzipping file: ${error}`);
    throw error;
  }
};
