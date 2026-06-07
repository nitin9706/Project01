import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { pipeline } from "stream/promises";
import fs from "fs";
import path from "path";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const OutputDir = path.resolve("Output");

export const getZipFromS3 = async (zipFileKey) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: zipFileKey,
    });

    const response = await client.send(command);

    if (!response.Body) {
      throw new Error("File not found in S3 bucket");
    }

    if (!fs.existsSync(OutputDir)) {
      fs.mkdirSync(OutputDir, { recursive: true });
    }

    const fileName = zipFileKey.split("/").pop();
    const filePath = path.join(OutputDir, fileName);

    await pipeline(response.Body, fs.createWriteStream(filePath));

    return filePath;
  } catch (error) {
    console.error("Error downloading zip file from S3:", error);
    throw error;
  }
};
``;
