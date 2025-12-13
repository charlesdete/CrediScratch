import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ requiredRole }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // If route needs a specific role (e.g. admin = 1)
  if (requiredRole !== undefined && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
