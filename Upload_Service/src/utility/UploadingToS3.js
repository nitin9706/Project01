import {
  S3Client,
  HeadObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import fs from "fs";
import mime from "mime-types";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  maxAttempts: 3,
});

const bucketName = process.env.AWS_S3_BUCKET_NAME;

const uploadToS3 = async (zipPath, key) => {
  const fileStream = fs.createReadStream(zipPath);

  const contentType = mime.lookup(zipPath) || "application/octet-stream";
  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
    ContentType: contentType,
  };

  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
    });
    console.time("s3-upload");

    const result = await parallelUploads3.done();

    console.timeEnd("s3-upload");
    console.log(`File uploaded successfully to S3: ${key}`);

    return result;
  } catch (err) {
    console.error("Error uploading file to S3:", err);
    throw err;
  }
};

const checkS3FileExists = async (key) => {
  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: bucketName,
        Key: key,
      }),
    );
    return true;
  } catch (err) {
    if (err.name === "NotFound") {
      return false;
    }
    console.error("Error checking file in S3:", err);
    throw err;
  }
};

const deleteFromS3 = async (key) => {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      }),
    );
    console.log(`File deleted successfully from S3: ${key}`);
  } catch (err) {
    console.error("Error deleting file from S3:", err);
    throw err;
  } finally {
    // cleanup local file if it exists
    const localFilePath = `./Output/${key.split("/").pop()}`;
    if (fs.existsSync(localFilePath)) {
      fs.rmSync(localFilePath, { force: true });
    }
  }
};

export { uploadToS3, checkS3FileExists, deleteFromS3 };
