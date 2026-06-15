import { useState, useEffect, useCallback, type ReactNode } from "react";
import { setLogout } from "@/services/auth-service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    setLoading(false);
  }, []);

  const login = useCallback(
    (newToken: string) => {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      navigate("/");
    },
    [navigate],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    setLogout(logout);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
