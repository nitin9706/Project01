import { useMemo, useState, useEffect } from "react";
import { AuthContext } from "./authContext.jsx";
import { useCurrentUser } from "../Api/queryHooks.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { data, isLoading } = useCurrentUser();

  useEffect(() => {
    if (data) {
      // server may return { success, data: { user } } or { user }
      const normalized = data?.data?.user ?? data?.user ?? data;
      setUser(normalized || null);
    } else if (!isLoading) {
      setUser(null);
    }
  }, [data, isLoading]);

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading: isLoading,
      logout,
      isAuthenticated: !!user,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
