import { processDeployment } from "../service/processDeployment.service.js";
import { redis } from "../config/redis.js";

export async function startWorker() {
  console.log("worker function envoked");

  while (true) {
    console.log(`worker intiallised`);

    const result = await redis.brpop("deployments", 0);

    const [, payload] = result;

    const { deploymentId, zipFileKey, deploymentEntry } = JSON.parse(payload);

    console.log(
      ` data from payload is zipfilekey = ,${zipFileKey} , deploymentid= ${deploymentId}, ${deploymentEntry}`,
    );

    try {
      console.log("deployment function envoked");
      await processDeployment(deploymentId, zipFileKey, deploymentEntry);

      console.log(`Deployment ${zipFileKey} completed`);
    } catch (error) {
      console.error(error);
    }
  }
}
