import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import cloningRoute from "./feature/cloning/cloning.route.js";
import userRoute from "./feature/Users/user.route.js";
app.use("/api/v1/clone", cloningRoute);
app.use("/api/v1/user", userRoute);

export { app };
