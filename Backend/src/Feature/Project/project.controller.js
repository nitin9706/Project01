import asyncHandler from "../../utility/asyncHandler.js";
import { Project } from "./project.model.js";
import { ApiError } from "../../utility/ApiError.js";
import { ApiResponse } from "../../utility/ApiResponse.js";

// create project
export const createProject = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    name,
    status,
    repoUrl,
    branch,
    framework,
    buildCommand,
    outputDirectory,
    subdomain,
    AutoDeploy,
  } = req.body;

  const project = new Project({
    name: name,
    status: status,
    RepoInfo: { repoUrl: repoUrl, branch: branch },
    BuildConfig: {
      framework: framework,
      buildCommand: buildCommand,
      outputDirectory: outputDirectory,
    },
    DeploymentConfig: { subdomain: subdomain, AutoDeploy: AutoDeploy },
    userId: userId,
  });

  const createdProject = await Project.findById(project._id).populate(
    "userId",
    "name email",
  );

  if (!createdProject) {
    throw new ApiError(500, "Failed to create project");
  }

  res
    .status(201)
    .json(new ApiResponse(201, "Project created successfully", createdProject));
});

// get all projects

const getAllProjects = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const projects = await Project.find({ userId: userId });

  if (!projects) {
    throw new ApiError(404, "No projects found for the user");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Projects fetched successfully", projects));
});

// getting project by id

const getProjectById = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const userId = req.user._id;

  const project = await Project.findOne({ _id: projectId, userId: userId });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Project fetched successfully", project));
});

//  update project by id
const updateProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const userId = req.user._id;
  const updateData = req.body;

  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId: userId },
    updateData,
    { new: true },
  );

  if (!project) {
    throw new ApiError(404, "Project not found or user not authorized");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Project updated successfully", project));
});

// delete project by id
const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const userId = req.user._id;

  const project = await Project.findOneAndDelete({
    _id: projectId,
    userId: userId,
  });

  if (!project) {
    throw new ApiError(404, "Project not found or user not authorized");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Project deleted successfully", project));
});

export {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
