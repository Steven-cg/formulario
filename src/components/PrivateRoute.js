// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Obtén el token de localStorage

  // Si el token no existe, redirige a la página de inicio
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si hay un token, renderiza los hijos
  return children;
};

export default PrivateRoute;
