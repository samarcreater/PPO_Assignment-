import React, { useState } from 'react';
import { useCart } from '../CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const [quantities, setQuantities] = useState(
    cartItems.map(() => 1) // Initialize quantities for each cart item
  );

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const calculateDiscount = () => {
    const total = parseFloat(calculateTotalPrice());
    return (total * 0.10).toFixed(2); // 10% discount
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item, index) => {
      return total + item.price * quantities[index];
    }, 0).toFixed(2);
  };
  const calculateFinalTotal = () => {
    const total = parseFloat(calculateTotalPrice());
    const discount = parseFloat(calculateDiscount());
    return (total - discount).toFixed(2);
  };

  return (
    <div className='cart-container'>
      <h1 className='cart-page-title'>Cart Page</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className='cart-content'>
          <div className='cart-items'>
            {cartItems.map((item, index) => (
              <div key={index} className='cart-item-info'>
                <div className='border-1'>
                  <div className='product-item-info'>
                    <div>
                      <img className='img-width' src={item.image} alt={item.title} />
                    </div>
                    <div className='gap-item'>
                      <p>{item.title}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                  <div className='incre-count'>
                    <button onClick={() => handleIncrement(index)}>+</button>
                    <span>{quantities[index]}</span>
                    <button onClick={() => handleDecrement(index)}>-</button>
                  </div>
                </div>
                <div className='remove-btn'>
                  <button className='remove-width' onClick={() => handleRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <div>
              <h2>Cart Summary</h2>
            </div>
            <div className='border-1 width-border'>
              <div className='product-item-detail'>
                <div className='summary'>
                  <p>Total Price: </p>
                  <p>${calculateTotalPrice()}</p>
                </div>
                <div className='summary'>
                  <p>Discount: </p>
                  <p>{ calculateDiscount()}</p> {/* Placeholder for discount calculation if any */}
                </div>
                <div className='summary'>
                  <p>Delivery: </p>
                  <p>Free</p>
                </div>
                <div className='summary border-width-bg'>
                  <p>Final Total: </p>
                  <p>${calculateFinalTotal()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
