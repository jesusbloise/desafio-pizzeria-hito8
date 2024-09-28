import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const CartModal = ({ show, handleClose }) => {
  const { cartItems, addToCart, removeFromCart, total, clearCart } = useCart();

  const formatTotal = (amount) => {
    return amount.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Carrito de Compras</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={item.img} alt={item.name} style={{ width: '50px', height: '50px' }} />
                <span>{item.name}</span>
                <div>
                  <Button variant="secondary" size="sm" onClick={() => removeFromCart(item.id)}>-</Button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <Button variant="secondary" size="sm" onClick={() => addToCart(item)}>+</Button>
                </div>
                <span>{formatTotal(item.price * item.quantity)}</span>
              </div>
            ))}
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Total:</strong>
              <span>{formatTotal(total)}</span>
            </div>
          </>
        ) : (
          <p>Tu carrito está vacío</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={clearCart}>
          Vaciar Carrito
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary">Pagar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;

