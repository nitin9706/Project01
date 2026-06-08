import axiosClient from "./apiFetcher.js";

// getting the data for every situation

// Login

// Register


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
