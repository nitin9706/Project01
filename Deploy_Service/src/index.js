import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

import { startWorker } from "./worker/deployment.worker.js";

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

console.log("Starting worker...");
await startWorker();
console.log("Worker started");
