import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/AuthService';

// Private route component to protect pages
const PrivateRoute = ({ children }) => {
  const token = getToken();

  // Redirect to login if no token is found
  return token ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;