import { exec } from "child_process";
import util from "util";
import fs from "fs/promises";
import path from "path";

const execute = util.promisify(exec);

const BUILD_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export const deployProject = async ({ projectDir, deploymentId }) => {
  const deployRoot = "/var/www/deployments";
  const tempDeployPath = path.join(deployRoot, `${deploymentId}-tmp`);

  const finalDeployPath = path.join(deployRoot, deploymentId);

  try {
    console.log(`[${deploymentId}] Starting deployment`);

    // Verify package.json exists
    await fs.access(path.join(projectDir, "package.json"));

    // Install dependencies
    console.log(`[${deploymentId}] Installing dependencies`);

    await execute("npm ci", {
      cwd: projectDir,
      timeout: BUILD_TIMEOUT,
      maxBuffer: 10 * 1024 * 1024,
    });

    // Build
    console.log(`[${deploymentId}] Building project`);

    await execute("npm run build", {
      cwd: projectDir,
      timeout: BUILD_TIMEOUT,
      maxBuffer: 10 * 1024 * 1024,
    });

    // Verify build output
    const distPath = path.join(projectDir, "dist");

    await fs.access(distPath);

    // Remove temp deployment if exists
    await fs.rm(tempDeployPath, {
      recursive: true,
      force: true,
    });

    // Copy build output
    await fs.cp(distPath, tempDeployPath, {
      recursive: true,
    });

    // Atomic swap
    await fs.rm(finalDeployPath, {
      recursive: true,
      force: true,
    });

    await fs.rename(tempDeployPath, finalDeployPath);

    console.log(`[${deploymentId}] Deployment successful`);

    return {
      success: true,
      deploymentId,
      url: `https://your-domain.com/${deploymentId}/`,
      deployedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`[${deploymentId}] Deployment failed`, error);

    // Cleanup temp files
    await fs.rm(tempDeployPath, {
      recursive: true,
      force: true,
    });

    return {
      success: false,
      deploymentId,
      error: error.message,
    };
  }
};
