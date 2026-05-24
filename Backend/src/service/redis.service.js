import Redis from "ioredis";

const redisClient = new Redis({
  host: "redis",
  port: 6379,
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

export default redisClient;
