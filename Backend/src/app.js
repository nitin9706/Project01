import express from "express";
import cookieParser from "cookie-parser";
import redisClient from "./service/redis.service.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

//  importing the routes to the app
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/project.route.js";
import cloningRoute from "./routes/cloning.route.js";

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/clone", cloningRoute);

// making the redis client available in the req object for all the routes
app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});

export default app;
