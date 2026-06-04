// we will download the zipped file from the s3 bucket

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const getZipFromS3 = async (zipFileKey) => {
  try {
    // getting the file from the s3 bucket

    const getFileCommand = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: zipFileKey,
    });
    const getFile = await client.send(getFileCommand);
    if (!getFile.Body) {
      throw new Error("File not found in S3 bucket");
    }

    return getFile.Body;
  } catch (error) {
    console.error("Error fetching zip file:", error);
    throw error;
  }
};
