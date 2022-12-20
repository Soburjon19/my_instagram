import React from 'react';
import { HOME } from './../constants/routes';
import { Navigate } from 'react-router-dom';

const IsUserLoggedIn = ({ user, children }) => {
    if (user) {
        return <Navigate to={HOME} replace />;
    }

    return children;
};

export default IsUserLoggedIn;
