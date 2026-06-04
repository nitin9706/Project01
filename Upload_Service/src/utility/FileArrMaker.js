import fs from "fs";
import path from "path";

const ignoredFolders = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
  "out",
  "tmp",
];

const ignoredExtensions = [".jpeg", ".gif", ".mp4", ".zip", ".exe"];

export const getAllFiles = (directoryPath, fileList = []) => {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    // ignore folders
    if (ignoredFolders.includes(file)) {
      return;
    }

    // ignore extensions
    const ext = path.extname(file);

    if (ignoredExtensions.includes(ext)) {
      return;
    }

    const filePath = path.join(directoryPath, file);

    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
};
