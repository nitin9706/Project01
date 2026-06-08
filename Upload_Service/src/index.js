import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import cloningRoute from "./feature/cloning/cloning.route.js";
app.use("/api/v1/clone", cloningRoute);

export { app };
