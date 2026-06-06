import { processDeployment } from "../service/processDeployment.service.js";
import { redis } from "../config/redis.js";

export async function startWorker() {
  while (true) {
    const result = await redis.brpop("deployments", 0);

    const [, payload] = result;

    const job = JSON.parse(payload);

    try {
      await processDeployment(job.bucketName, job.zipFileKey);

      console.log(`Deployment ${job.zipFileKey} completed`);
    } catch (error) {
      console.error(error);
    }
  }
}
