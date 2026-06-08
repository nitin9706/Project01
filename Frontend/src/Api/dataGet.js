import axiosClient from "./apiFetcher.js";

// getting the data for every situation

// Login
export const loginUser = async (data) => {
  return await axiosClient.post("/user/login", data);
};

// logout
export const logoutUser = async (data) => {
  return await axiosClient.post("/user/logout", data);
};

// Register
export const registerUser = async (data) => {
  return await axiosClient.post("/user/register", data);
};

// deployements
// creating deployment
export const createDeployment = async (data) => {
  return await axiosClient.post("/clone/createClone", data);
};

// getting all deployments
export const getAllDeployment = async (data) => {
  return await axiosClient.get("/clone/getAllProjects", data);
};

// getting single deployment
export const getDeployment = async (id) => {
  return await axiosClient.get(`/clone/getProject/${id}`);
};

// deleting  deployment
export const deleteDeployment = async (id) => {
  return await axiosClient.delete(`/clone/deleteProject/${id}`);
};
