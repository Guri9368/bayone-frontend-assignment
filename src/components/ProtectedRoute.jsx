import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

function ProtectedRoute({ children }) {
  // Check if user has valid token
  const isLoggedIn = isAuthenticated();

  // If not authenticated, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, show the protected page
  return children;
}

export default ProtectedRoute;
