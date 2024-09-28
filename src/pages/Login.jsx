// Login.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Todos los campos son obligatorios.');
      return;
    }

    if (password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      // Llamamos al método login del UserContext con los datos del usuario
      await login({ email, password });
      setMessage('Inicio de sesión exitoso!');
      navigate('/Profile'); // Redirigimos al perfil si el login es exitoso
    } catch (error) {
      setMessage(error.message); // Mostrar el mensaje de error del UserContext
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Inicio de Sesión</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
              </form>
              {message && <p className="mt-3 text-center text-danger">{message}</p>} {/* Color rojo para el mensaje */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

