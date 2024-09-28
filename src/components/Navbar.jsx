import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import { useUser } from '../context/UserContext';

const MyNavbar = () => {
  const { total } = useCart();
  const { token, logout } = useUser();
  const [showCart, setShowCart] = useState(false);
  const [formattedTotal, setFormattedTotal] = useState();

  const formatTotal = (amount) => {
    return amount.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
  };

  useEffect(() => {
    setFormattedTotal(formatTotal(total));
  }, [total]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Pizzería Mamma Mia!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">🍕 Home</Nav.Link>
            {/* Mostrar Login y Register solo si no hay token */}
            {!token && (
              <>
                <Nav.Link as={Link} to="/login">🍕 Login</Nav.Link>
                <Nav.Link as={Link} to="/register">🍕 Register</Nav.Link>
              </>
            )}
            {/* Mostrar Logout y Perfil solo si hay token */}
            {token && (
              <>
                <Nav.Link as={Link} to="/profile">👤 Perfil</Nav.Link>
                <Button variant="danger" onClick={logout} style={{ marginLeft: "10px" }}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
          <Button variant="primary" style={{ marginLeft: "auto" }} onClick={() => setShowCart(true)}>
            🛒 Total: {formattedTotal}
          </Button>
          <CartModal show={showCart} handleClose={() => setShowCart(false)} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

