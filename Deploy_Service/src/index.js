import express from "express";
import dotenv from "dotenv";

import { startWorker } from "./worker/deployment.worker.js";

const app = express();

dotenv.config({
  path: "./env",
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

startWorker();
