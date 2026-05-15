import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  adding the routes to the app

import userRoute from "./Feature/User/user.route.js";
app.use("/api/v1/user", userRoute);
export default app;
