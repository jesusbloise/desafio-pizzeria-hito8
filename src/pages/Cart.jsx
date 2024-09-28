// src/pages/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext'; // Asegúrate de importar

const Cart = () => {
  const { cartItems, total } = useCart();
  const { token } = useUser();
  const [successMessage, setSuccessMessage] = useState('');

  console.log("Token actual:", token); // Verifica si el token está disponible

  const handleCheckout = async () => {
    if (!token) {
      console.error("User not authenticated");
      return; // Evita continuar si no hay token
    }

    try {
      const response = await fetch('/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          total: total,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Checkout response:', data);
      setSuccessMessage("Compra realizada con éxito!");
    } catch (error) {
      console.error('Error during checkout:', error);
      setSuccessMessage("Error al realizar la compra.");
    }
  };

  return (
    <div className="cart-page">
      <h2>Tu Carrito</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.price}</p>
        </div>
      ))}
      
      <h3>Total: {total}</h3>
      <button disabled={!token} onClick={handleCheckout}>
        Pagar
      </button>

      {!token && <p>Inicia sesión para continuar con el pago.</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Cart;



// // src/pages/Cart.jsx
// import React, { useState } from 'react';
// import { useCart } from '../context/CartContext';
// import { useUser } from '../context/UserContext'; // Importa el hook del contexto de usuario

// const Cart = () => {
//   const { cartItems, total } = useCart();
//   const { token } = useUser(); // Accedemos al token
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleCheckout = async () => {
//     if (!token) {
//       console.error("User not authenticated");
//       return; // Evita continuar si no hay token
//     }

//     try {
//       const response = await fetch('/api/checkouts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, // Asegúrate de enviar el token
//         },
//         body: JSON.stringify({
//           items: cartItems,
//           total: total,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       console.log('Checkout response:', data);
//       setSuccessMessage("Compra realizada con éxito!");
//     } catch (error) {
//       console.error('Error during checkout:', error);
//       setSuccessMessage("Error al realizar la compra.");
//     }
//   };

//   return (
//     <div className="cart-page">
//       <h2>Tu Carrito</h2>
//       {/* Listado de productos */}
//       {cartItems.map((item) => (
//         <div key={item.id}>
//           <p>{item.name}</p>
//           <p>{item.price}</p>
//         </div>
//       ))}
      
//       <h3>Total: {total}</h3>

//       {/* Deshabilitar el botón si no hay token */}
//       <button disabled={!token} onClick={handleCheckout} className="btn btn-primary">
//         Pagar
//       </button>

//       {!token && <p>Inicia sesión para continuar con el pago.</p>}
//       {successMessage && <p>{successMessage}</p>} {/* Mensaje de éxito */}
//     </div>
//   );
// };

// export default Cart;

