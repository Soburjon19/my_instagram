import React from 'react';
import { Navigate } from 'react-router-dom';
import { LOGIN } from '../constants/routes';

const ProtectedRoute = ({ user, children}) => {
    if (!user) {
        return <Navigate to={LOGIN} replace />;
    }

    return children;
};

export default ProtectedRoute;
