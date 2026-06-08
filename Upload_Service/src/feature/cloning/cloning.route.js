import Router from "express";
// import { verifyJWT } from "../../../Backend/src/Middleware/Auth.middleware.js";
import {
  cloneProject,
  checks3folder,
  deleteOnS3,
  getAnyProject,
  deleteDeployment,
  getAllProjects,
} from "./Cloning.controller.js";
const router = Router();

// router.use(verifyJWT);

router.route("/createClone").post(cloneProject);
router.route("/getAllProjects").get(getAllProjects);
router.route("/getProject/:id").get(getAnyProject);
router.route("/deleteProject/:id").delete(deleteDeployment);

// test routes
router.route("/checkS3/:id").get(checks3folder);
router.route("/deleteS3/:id").delete(deleteOnS3);

export default router;
