import express from "express";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import deployRouter from "./feature/deploy.route.js";

app.use("/api/v1/deploy", deployRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
