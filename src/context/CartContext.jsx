import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cartItems from localStorage", error);
      return [];
    }
  });

  const [total, setTotal] = useState(() => {
    try {
      const savedTotal = localStorage.getItem('cartTotal');
      return savedTotal ? JSON.parse(savedTotal) : 0;
    } catch (error) {
      console.error("Error parsing cartTotal from localStorage", error);
      return 0;
    }
  });

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);

    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('cartTotal', JSON.stringify(newTotal));
    } catch (error) {
      console.error("Error saving cart to localStorage", error);
    }
  }, [cartItems]);

  const addToCart = (pizza) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === pizza.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...pizza, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (pizzaId) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === pizzaId) {
          if (item.quantity === 1) return acc;
          return [...acc, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...acc, item];
        }
      }, [])
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartTotal');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

