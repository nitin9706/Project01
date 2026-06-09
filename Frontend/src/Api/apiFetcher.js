import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API || "http://localhost:8000/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Debug: show outgoing request url and whether token exists
    // (remove or lower verbosity in production)
    try {
      // eslint-disable-next-line no-console
      console.debug(
        "API Request:",
        config.method,
        config.baseURL + config.url,
        token ? "with-token" : "no-token",
      );
    } catch (e) {}

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
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
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
