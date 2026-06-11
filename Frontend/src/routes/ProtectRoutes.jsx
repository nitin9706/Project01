import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_API || "http://localhost:8000/api/v1";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    const verify = async () => {
      try {
        // Call refresh endpoint using cookies (withCredentials)
        const resp = await axios.post(
          `${BASE_URL}/user/refreshAccessToken`,
          {},
          { withCredentials: true },
        );
        if (!mounted) return;
        // ApiResponse shape: { statusCode, data, message, success }
        const api = resp?.data;
        const newToken = api?.data?.accessToken;
        if (newToken) {
          try {
            localStorage.setItem("token", newToken);
          } catch (e) {}
          setAuthenticated(true);
        } else if (api?.success) {
          // refresh succeeded (cookies likely valid)
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        setAuthenticated(false);
      } finally {
        if (mounted) setChecking(false);
      }
    };

    verify();
    return () => {
      mounted = false;
    };
  }, []);

  if (checking) return null;
  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
}
