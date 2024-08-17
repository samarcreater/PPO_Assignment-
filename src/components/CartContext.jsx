import React, { createContext, useContext, useState } from 'react';

// Create the context
const CartContext = createContext();

// Custom hook to use the Cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Function to remove a product from the cart
  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };
  const getTotalItem = () =>{
    return cartItems.length
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalItem }}>
      {children}
    </CartContext.Provider>
  );
};
