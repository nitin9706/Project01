import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");

      setUser(storedUser);
    } catch (error) {
      console.error("Failed to load user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync auth state across browser tabs
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "user") {
        try {
          const storedUser = JSON.parse(localStorage.getItem("user") || "null");

          setUser(storedUser);
        } catch {
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
