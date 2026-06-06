import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

export const triggerDeployment = async (deploymentId, zipFileKey) => {
  await redis.lpush(
    "deployments",
    JSON.stringify({
      deploymentId,
      zipFileKey,
    }),
  );

  console.log(`Deployment job queued: ${deploymentId}`);
};
