import { useEffect, useMemo, useState } from "react";
import { refreshAccessToken } from "../Api/dataGet.js";
import { AuthContext } from "./authContext.jsx";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await refreshAccessToken();

        const data = response?.data?.data;

        setUser(data?.user || null);
      } catch (error) {
        console.error("Authentication failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
