// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute
 *
 * Wrap any route element that requires a logged-in user:
 *   <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
 *
 * Redirects to /login and remembers where the user was headed, so
 * LoginPage can send them back after signing in.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;