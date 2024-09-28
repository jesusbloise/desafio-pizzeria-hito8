
// src/context/UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  // Función para hacer login
  const login = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Usuario No registrado. Por favor registrese.');
      }

      const data = await response.json();
      console.log("Token recibido:", data.token); // Verifica el token
      setToken(data.token); // Guardar el token recibido
      setEmail(data.email); // Guardar el email del usuario
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error; // Propagar el error para manejarlo en el Login.jsx
    }
  };

  // Función para hacer register
  const register = async ({ email, password }) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extraer mensaje de error del backend
      throw new Error(errorData.message || 'Error durante el registro'); // Lanzar error
    }

    const { token, email: userEmail } = await response.json();
    console.log("Token registrado:", token); // Verifica el token
    setToken(token);
    setEmail(userEmail);
  };

  // Función para cerrar sesión (logout)
  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  // Función para obtener el perfil del usuario
  const getProfile = async () => {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Agrega el token en los encabezados
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching user profile');
    }

    const data = await response.json();
    setEmail(data.email); // Actualiza el email desde la respuesta
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};


