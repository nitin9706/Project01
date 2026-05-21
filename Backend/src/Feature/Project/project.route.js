import Router from "express";
import { verifyJWT } from "../../Middleware/Auth.middleware.js";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "./project.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/createProject").post(createProject);
router.route("/getAllProjects").get(getAllProjects);
router.route("/getProjectById/:id").get(getProjectById);
router.route("/updateProject/:id").put(updateProject);
router.route("/deleteProject/:id").delete(deleteProject);

export default router;
