import { Router } from "express";
import { deployController } from "./deploy.controller.js";

const router = Router();

router.route("/createDeployment").post(deployController);

export default router;
