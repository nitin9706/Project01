import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

import { startWorker } from "./worker/deployment.worker.js";
import { connectDB } from "./database/db.js";

connectDB()
  .then(() => {
    console.log(`DEPLOY_SERVICE IS CONNECTED TO THE DATABASE`);
  })
  .catch((err) => {
    console.log(`DATABASE CONNECTION FAILED IN DEPLOY_SERVICE ${err}`);
  });

console.log("Starting worker...");
await startWorker();
console.log("Worker started");
