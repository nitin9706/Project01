import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

//  importing the routes to the app

import userRoute from "./Feature/User/user.route.js";
import projectRoute from "./routes/project.route.js";
import cloningRoute from "./Feature/Cloning Project/Cloning.route.js";
// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/clone", cloningRoute);
export default app;
