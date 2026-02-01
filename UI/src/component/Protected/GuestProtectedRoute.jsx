import React from "react";
import { Navigate } from "react-router-dom";

const GuestProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (user) {
    if (Number(user.role) === 1) {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/user-dashboard" replace />;
    }
  }

  return children;
};

export default GuestProtectedRoute;
