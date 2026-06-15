import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Cadastro from "@/pages/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/cadastro" element={<Cadastro />}></Route>
    </Routes>
  );
}
