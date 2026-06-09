import { Router } from "express";

import {
  deleteUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "./user.controller.js";

import { verifyJWT } from "../../Middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refreshAccessToken").post(refreshAccessToken);

router.route("/delete").delete(verifyJWT, deleteUser);

export default router;
