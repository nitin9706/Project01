import Router from "express";
import { verifyJWT } from "../Middleware/Auth.middleware.js";
import { cloneProject } from "../controllers/Cloning.controller.js";
const router = Router();

router.use(verifyJWT);

router.route("/createClone").post(cloneProject);

export default router;
