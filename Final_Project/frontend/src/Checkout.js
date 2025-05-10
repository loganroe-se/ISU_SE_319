import React, { useState } from 'react';
import "./Checkout.css"
import { formatCurrency } from './utils';
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, setCart, cartTotal, setCartTotal, shippingState, setShippingState, shippingCity, setShippingCity, shippingStreet, setShippingStreet, shippingZip, setShippingZip }) => {

  //Use states for various items that will need to be set from the form in order to set values at the submit
  const navigate = useNavigate();
  const [useSameShipping, setUseSameShipping] = useState(true);
  const [billingStreet, setBillingStreet] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const calculateItemTotal = (product) => product.Cost * product.quantity;

  // Update cart total
  const updateCartTotal = (updatedCart) => {
    const newTotal = updatedCart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
    setCartTotal(newTotal);
  };

  // Increase item quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    updateCartTotal(updatedCart);
  };

  // Decrease item quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    updateCartTotal(updatedCart);
  };

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    updateCartTotal(updatedCart);
  };

  // Handle the form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length > 0) {

      if (useSameShipping) {
        setShippingCity(billingCity);
        setShippingState(billingState);
        setShippingZip(billingZip);
        setShippingStreet(billingStreet);
      }
      else {
        setShippingCity(shippingCity);
        setShippingState(shippingState);
        setShippingZip(shippingZip);
        setShippingStreet(shippingStreet);
      }

      navigate(`/summary`);
    }
    else{
      alert("You must have at least 1 item in the cart to checkout");
    }
  };
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Your Cart</h1>

      {/* Displaying the cart items */}
      <div className="row">
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="col-md-12 mb-3">
              <div className="card p-3 rounded">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      src={item.Image}
                      alt={item.Name}
                      style={{ width: '200px', height: 'auto' }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-4">
                    <h5>{item.Name}</h5>
                  </div>
                  <div className="col-md-2">
                    <p>{formatCurrency(item.Cost)}</p>
                  </div>
                  <div className="col-md-2 d-flex">
                    <button className="btn btn-secondary btn-sm me-2" style={{ marginBottom: "15px" }} onClick={() => decreaseQuantity(item._id)}>-</button>
                    <p className="m-0" style={{padding: "2px 10px 0 5px"}}>{item.quantity}</p>
                    <button className="btn btn-secondary btn-sm me-2" style={{ marginBottom: "15px" }} onClick={() => increaseQuantity(item._id)}>+</button>
                  </div>
                  <div className="col-md-1">
                    <p>{formatCurrency(calculateItemTotal(item))}</p>
                  </div>
                  <div className="col-md-1">
                    <button className="btn btn-danger btn-sm" style={{ marginBottom: "15px" }} onClick={() => removeItem(item._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Display the total cost */}
      {cart.length > 0 && (
        <div className="mt-4 text-end">
          <h3>Total: {formatCurrency(cartTotal)}</h3>
        </div>
      )}<br />

      <div className="checkout-container">
        <h1>Payment</h1>
        <form onSubmit={handleSubmit}>
          {/* Credit Card Input */}
          <div className="form-group">
            <label>Credit Card Number:</label>
            <input
              type="text"
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
              placeholder="Enter credit card number"
              required
            />
          </div>

          {/* First Name */}
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Billing Address */}
          <h1 className="pt-3">Billing Address</h1>
          <div className="form-group">
            <label>Street:</label>
            <input
              type="text"
              value={billingStreet}
              onChange={(e) => setBillingStreet(e.target.value)}
              placeholder="Enter street address"
              required
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              value={billingCity}
              onChange={(e) => setBillingCity(e.target.value)}
              placeholder="Enter city"
              required
            />
          </div>
          <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              value={billingState}
              onChange={(e) => setBillingState(e.target.value)}
              placeholder="Enter state"
              required
            />
          </div>
          <div className="form-group">
            <label>Zip Code:</label>
            <input
              type="text"
              value={billingZip}
              onChange={(e) => setBillingZip(e.target.value)}
              placeholder="Enter zip code"
              required
            />
          </div>

          {/* Shipping Address */}
          <div className="form-group">
            <label>
              <input style={{ marginRight: "10px" }}
                type="checkbox"
                checked={useSameShipping}
                onChange={() => setUseSameShipping(!useSameShipping)}
              />
              Shipping address is the same as billing address
            </label>
          </div>

          {!useSameShipping && (
            <>
              <h1 className="pt-3">Shipping Address</h1>
              <div className="form-group">
                <label>Street:</label>
                <input
                  type="text"
                  value={shippingStreet}
                  onChange={(e) => setShippingStreet(e.target.value)}
                  placeholder="Enter street address"
                />
              </div>
              <div className="form-group">
                <label>City:</label>
                <input
                  type="text"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div className="form-group">
                <label>State:</label>
                <input
                  type="text"
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}
                  placeholder="Enter state"
                />
              </div>
              <div className="form-group">
                <label>Zip Code:</label>
                <input
                  type="text"
                  value={shippingZip}
                  onChange={(e) => setShippingZip(e.target.value)}
                  placeholder="Enter zip code"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button type="submit" id="submitbutton" className="btn">
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

