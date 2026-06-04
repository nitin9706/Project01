import fs from "fs";
import path from "path";
import archiver from "archiver";

// archiver function to zip a folder

export const zipFolder = (sourceFolder, outputZipPath) => {
  return new Promise((resolve, reject) => {
    const sourcePath = path.resolve(sourceFolder);
    const outputPath = path.resolve(outputZipPath);

    if (!fs.existsSync(sourcePath)) {
      return reject(new Error(`Source folder does not exist: ${sourcePath}`));
    }

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(outputPath), {
      recursive: true,
    });

    const output = fs.createWriteStream(outputPath);

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", () => {
      console.log(`ZIP created successfully: ${outputPath}`);
      console.log(`Total size: ${archive.pointer()} bytes`);
      resolve(outputPath);
    });

    output.on("error", reject);
    archive.on("error", reject);

    archive.pipe(output);

    // Add the whole folder
    archive.directory(sourcePath, false);

    archive.finalize();
  });
};
