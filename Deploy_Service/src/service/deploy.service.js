import { exec } from "child_process";
import util from "util";
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";

const execute = util.promisify(exec);

const BUILD_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export const deployProject = async (projectDir, deploymentId) => {
  const deployRoot = "/var/www/deployments";

  const tempDeployPath = path.join(deployRoot, `${deploymentId}-tmp`);

  const backupDeployPath = path.join(deployRoot, `${deploymentId}-backup`);

  const finalDeployPath = path.join(deployRoot, deploymentId);

  const lockFile = path.join(deployRoot, `${deploymentId}.lock`);

  try {
    await fs.mkdir(deployRoot, {
      recursive: true,
    });

    // Prevent concurrent deployments
    if (existsSync(lockFile)) {
      throw new Error(`Deployment ${deploymentId} is already in progress`);
    }

    await fs.writeFile(lockFile, "locked");

    console.log(`[${deploymentId}] Starting deployment`);

    // Verify package.json exists
    await fs.access(path.join(projectDir, "package.json"));

    console.log(`[${deploymentId}] Installing dependencies`);

    await execute("npm ci", {
      cwd: projectDir,
      timeout: BUILD_TIMEOUT,
      maxBuffer: 10 * 1024 * 1024,
    });

    console.log(`[${deploymentId}] Building project`);

    const { stdout, stderr } = await execute("npm run build", {
      cwd: projectDir,
      timeout: BUILD_TIMEOUT,
      maxBuffer: 10 * 1024 * 1024,
    });

    if (stdout) {
      console.log(stdout);
    }

    if (stderr) {
      console.error(stderr);
    }

    const distPath = path.join(projectDir, "dist");

    // Verify build output exists
    await fs.access(distPath);

    // Clean temp deployment
    await fs.rm(tempDeployPath, {
      recursive: true,
      force: true,
    });

    // Copy build output
    await fs.cp(distPath, tempDeployPath, {
      recursive: true,
    });

    // Backup existing deployment
    if (existsSync(finalDeployPath)) {
      await fs.rm(backupDeployPath, {
        recursive: true,
        force: true,
      });

      await fs.rename(finalDeployPath, backupDeployPath);
    }

    // Promote new deployment
    await fs.rename(tempDeployPath, finalDeployPath);

    // Remove backup after successful deployment
    await fs.rm(backupDeployPath, {
      recursive: true,
      force: true,
    });

    console.log(`[${deploymentId}] Deployment successful`);

    return {
      success: true,
      deploymentId,
      url: `${process.env.DEPLOYMENT_BASE_URL}/${deploymentId}/`,
      deployedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`[${deploymentId}] Deployment failed`, error);

    // Cleanup temp deployment
    await fs.rm(tempDeployPath, {
      recursive: true,
      force: true,
    });

    // Rollback if needed
    if (existsSync(backupDeployPath) && !existsSync(finalDeployPath)) {
      try {
        await fs.rename(backupDeployPath, finalDeployPath);

        console.log(`[${deploymentId}] Rollback successful`);
      } catch (rollbackError) {
        console.error(`[${deploymentId}] Rollback failed`, rollbackError);
      }
    }

    return {
      success: false,
      deploymentId,
      error: error.message,
    };
  } finally {
    // Remove deployment lock
    await fs.rm(lockFile, {
      force: true,
    });

    // Cleanup uploaded project
    await fs.rm(projectDir, {
      recursive: true,
      force: true,
    });
  }
};
