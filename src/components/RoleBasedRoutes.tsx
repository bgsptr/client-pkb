import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode
}

const RoleBasedRoutes = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // Declare decoded outside the if block
  let decoded;

  const token = localStorage.getItem("token");
  if (token) {
    decoded = jwtDecode(token);
    console.log(decoded.role);
  }

  return (
    decoded && decoded.role === allowedRoles ? (
      <Outlet />
    ) : auth?.user ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RoleBasedRoutes;
