// components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user_session");

  if (!isAuthenticated) {
    // Jika tidak login, arahkan ke login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
