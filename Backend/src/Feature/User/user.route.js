import router from "express";
import {
  deleteUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "./user.controller.js";
import { verifyJWT } from "../../Middleware/Auth.middleware.js";

const Router = router();

Router.route("/registerUser").post(registerUser);

Router.route("/loginUser").post(loginUser);

Router.route("/logoutUser").post(logoutUser);

Router.route("/refreshAccessToken").post(verifyJWT, refreshAccessToken);

Router.route("/deleteUser").delete(verifyJWT, deleteUser);

export default Router;
