import {Navigate} from "react-router-dom";
import React from "react";
import AuthContext from "../context/AuthContext.js";

const ProtectedRoute = ({ children }) => {
    const { user } = React.useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
export default ProtectedRoute;