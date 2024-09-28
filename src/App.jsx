
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Profile from './components/Profile';
import Pizza from './pages/Pizza';
import { UserProvider, useUser } from './context/UserContext';
import { CartProvider } from './context/CartContext'; // Importar CartProvider
import ProtectedRoute from './routes/ProtectedRoute'; 
import Cart from './pages/Cart';

function App() {
  return (
    <UserProvider>
      <CartProvider> {/* Agregar CartProvider aquí */}
        <Router>
          <MyNavbar />
          <Routes>
          <Route path="/cart" element={<Cart />} />
            <Route path="/header" element={<Header />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginRedirect />} />
            <Route path="/register" element={<RegisterRedirect />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider> {/* Cerrar CartProvider aquí */}
    </UserProvider>
  );
}

const LoginRedirect = () => {
  const { token } = useUser();
  return token ? <Navigate to="/" /> : <Login />;
};

const RegisterRedirect = () => {
  const { token } = useUser();
  return token ? <Navigate to="/" /> : <Register />;
};

export default App;


