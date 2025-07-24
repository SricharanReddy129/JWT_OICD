import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export default function AdminRoute() {
  const { user } = useAuth();

  const roles = user?.roles || [];
  const isAdmin = roles.includes("Admin") || roles.includes("Super Admin");

  return isAdmin ? <Outlet /> : <Navigate to="/home" replace />;
}

