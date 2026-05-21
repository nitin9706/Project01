import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  importing the routes to the app

import userRoute from "./Feature/User/user.route.js";
import projectRoute from "./Feature/Project/project.route.js";
// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRoute);

export default app;
