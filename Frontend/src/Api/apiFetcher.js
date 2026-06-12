import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    try {
      console.debug("API Response:", response.config.url, response.status);
    } catch {
      // Ignore logging errors
    }

    return response.data;
  },

  async (error) => {
    const originalRequest = error.config;

    // Network Error
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your internet connection.",
      });
    }

    // Handle 401 Unauthorized
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}/user/refreshAccessToken`,
          {},
          {
            withCredentials: true,
          },
        );

        const newToken = refreshResponse?.data?.data?.accessToken;

        if (!newToken) {
          throw new Error("No access token returned");
        }

        localStorage.setItem("token", newToken);

        axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        localStorage.removeItem("token");

        if (typeof window !== "undefined") {
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
