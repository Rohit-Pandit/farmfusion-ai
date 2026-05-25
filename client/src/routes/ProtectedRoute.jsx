import { Navigate } from "react-router-dom";
import React from "react";
import AuthContext from "../context/AuthContext.js";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;
