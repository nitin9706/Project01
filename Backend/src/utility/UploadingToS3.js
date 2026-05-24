import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import fs from "fs";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

const bucketName = process.env.AWS_S3_BUCKET_NAME;

const uploadToS3 = async (filePath, key) => {
  try {
    const filestream = fs.createReadStream(filePath);
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: filestream,
    };
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);
    console.log(`File uploaded successfully to S3: ${key}`);
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

export { uploadToS3 };
