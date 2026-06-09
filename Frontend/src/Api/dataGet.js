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

// refresh User Token
export const refreshAccessToken = async () => {
  return await axiosClient.post("/user/refreshAccessToken");
};

// delete User
export const deleteUser = async () => {
  return await axiosClient.delete("/user/delete");
};

// deployements
// creating deployment
export const createDeployment = async (data) => {
  return await axiosClient.post("/clone/createClone", data);
};

// {
//     "statusCode": 200,
//     "data": "Repository uploaded successfully  and queued",
//     "message": {
//         "success": true,
//         "id": "qixod62sbb",
//         "archiveUrl": {
//             "ServerSideEncryption": "AES256",
//             "Location": "https://deployify-app.s3.ap-south-1.amazonaws.com/archives/qixod62sbb.zip",
//             "Bucket": "deployify-app",
//             "Key": "archives/qixod62sbb.zip",
//             "ETag": "\"80e68c75ea48153faff9c7cef0b3bb91-4\"",
//             "ChecksumCRC32": "oTHfOg==-4",
//             "ChecksumType": "COMPOSITE",
//             "$metadata": {
//                 "httpStatusCode": 200,
//                 "requestId": "K1EPMPBYHFJ2K6BS",
//                 "extendedRequestId": "IbgtIo+54v6FcLkqQWTZorT8WwRksvO9aDLSUXo7OCwefrT0g05NmGiMDz9M/U+Xr8C5MG5p6UA=",
//                 "attempts": 1,
//                 "totalRetryDelay": 0
//             }
//         },
//         "deploymentDoc": {
//             "_id": "6a286a06f95111b3c51f99bb",
//             "deploymentId": "qixod62sbb",
//             "userId": "6a2861919c0d57824ea16b62",
//             "projectName": "main-portfolio",
//             "status": "queued",
//             "buildLogs": [],
//             "createdAt": "2026-06-09T19:31:18.745Z",
//             "updatedAt": "2026-06-09T19:31:18.745Z",
//             "__v": 0
//         }
//     },
//     "success": true
// }

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
