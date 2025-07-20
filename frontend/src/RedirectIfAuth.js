import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function RedirectIfAuth({ children }) {
  const { user } = useContext(AuthContext);
  if (user) return <Navigate to="/app" replace />;
  return children;
}

export default RedirectIfAuth; 