import { createContext } from "react";

interface AuthContextData {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData | null>(null);
