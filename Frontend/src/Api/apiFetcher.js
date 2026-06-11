import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_API || "http://localhost:8000/api/v1";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

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
      // eslint-disable-next-line no-console
      console.debug("API Response:", response.config.url, response.status);
    } catch (e) {}
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized, try refreshing access token once and retry original request
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        const refreshResp = await axios.post(
          `${BASE_URL}/user/refreshAccessToken`,
          {},
          { withCredentials: true },
        );

        // refreshResp follows ApiResponse shape: { statusCode, data, message, success }
        const newToken = refreshResp?.data?.data?.accessToken;
        if (newToken) {
          localStorage.setItem("token", newToken);
          axiosClient.defaults.headers.Authorization = `Bearer ${newToken}`;
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        // fall through to sign-out below
      }
    }

    // If we reach here, token refresh failed or not applicable -> sign out
    try {
      localStorage.removeItem("token");
    } catch (e) {}
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }

    return Promise.reject(
      error.response?.data || {
        message: "Something went wrong",
      },
    );
  },
);

export default axiosClient;
