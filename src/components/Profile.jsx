import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Importar el contexto de usuario

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const { logout } = useUser(); // Acceder a la función logout

  const handleLogout = () => {
    logout(); // Llamar a la función de cierre de sesión
    navigate('/'); // Redirigir al Home después de cerrar sesión
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">¡Bienvenido al Perfil!</h2>
              {email && (
                <p className="text-center mt-3">Correo electrónico: {email}</p>
              )}
              <button
                className="btn btn-primary btn-block mt-4"
                onClick={() => navigate('/')}
              >
                Ir al Home
              </button>
              <button
                className="btn btn-danger btn-block mt-2"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

