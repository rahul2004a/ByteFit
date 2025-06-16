import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from 'react-oauth2-code-pkce';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();

    // Check if user is authenticated via OAuth token or Redux state
    const isAuthenticated = token || user;

    if (!isAuthenticated) {
        // Show a toast message when redirecting unauthenticated users
        toast.error('Please sign in to access this page', {
            duration: 3000,
            position: 'top-center',
            style: {
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '12px',
                padding: '12px 20px',
                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
            }
        });

        // Redirect to landing page
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;