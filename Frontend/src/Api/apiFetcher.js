import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your internet connection.",
      });
    }

    const isRefreshRequest =
      originalRequest?.url?.includes("/user/refreshAccessToken");

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosClient(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(
          `${BASE_URL}/user/refreshAccessToken`,
          {},
          { withCredentials: true },
        );

        processQueue(null);
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/login")
        ) {
          window.location.href = "/login";
        }

        return Promise.reject(
          refreshError.response?.data || {
            message: "Session expired. Please login again.",
          },
        );
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(
      error.response?.data || {
        message: "Something went wrong",
      },
    );
  },
);

export default axiosClient;
