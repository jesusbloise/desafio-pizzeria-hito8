import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Asegúrate de que el UserContext esté bien configurado

const ProtectedRoute = ({ children }) => {
  const { token } = useUser(); // Accedemos al token del contexto de usuario

  // Si no hay token, redirigimos a /login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, mostramos el componente solicitado
  return children;
};

export default ProtectedRoute;
