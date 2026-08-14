import { useState, useEffect, useCallback, type ReactNode } from "react";
import { setLogout } from "@/services/auth-service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import api from "@/services/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/usuario/me");
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(() => {
    setIsAuthenticated(true);
    navigate("/");
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Erro no logout: ", error);
    } finally {
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    setLogout(logout);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
