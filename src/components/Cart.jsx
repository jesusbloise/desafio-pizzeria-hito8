
// Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Cart = () => {
  const { cartItems, total, clearCart } = useCart();
  const { token } = useUser(); // Asegúrate de que tienes el token aquí
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Usa el token aquí
        },
        body: JSON.stringify({
          items: cartItems,
          total: total,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en el checkout');
      }

      const data = await response.json();
      setMessage(data.message); // Muestra el mensaje de éxito
      clearCart(); // Limpia el carrito después del checkout

    } catch (error) {
      console.error('Error durante el checkout:', error);
      setMessage('Hubo un problema con el checkout.'); // Maneja el error
    }
  };

  return (
    <div>
      <h2>Mi Carrito</h2>
      {/* Renderiza los items del carrito */}
      {cartItems.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Precio: ${item.price} x {item.quantity}</p>
        </div>
      ))}
      <h3>Total: ${total}</h3>
      {/* <button onClick={handleCheckout}>Pagar</button> */}
      <button onClick={() => {
  console.log("Botón clicado manualmente");
  handleCheckout();
}}>Pagar</button>
      {message && <p>{message}</p>} {/* Muestra el mensaje de éxito o error */}
    </div>
  );
};

export default Cart;
