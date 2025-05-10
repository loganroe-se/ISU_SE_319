import React from 'react';
import { useNavigate } from "react-router-dom";
import "./Checkout.css";


const Summary = ({ cart, setCart, cartTotal, setCartTotal, shippingStreet, shippingCity, shippingState, shippingZip }) => {
  const navigate = useNavigate();
  // Function to navigate back to the home screen
  const goToHome = () => {
    setCart([]); //Empty the cart
    setCartTotal(0);
    navigate("/");
  };
  return (
    <div className="summary-container d-flex justify-content-center align-items-center">
      <div className="content-container">
        <h1 className="text-center mb-4">Your Order is On the Way!</h1>

        {/* Displaying Cart Items */}
        <div className="row justify-content-center">
          {cart.length === 0 ? (
            <p className="text-center">Your cart is empty!</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="col-md-4 mb-3">
                <div className="card p-3 rounded shadow-sm">
                  <div className="row align-items-center">
                    {/* Item Image */}
                    <div className="col-md-4">
                      <img
                        src={item.Image}
                        alt={item.Name}
                        style={{ width: '100px', height: 'auto' }}
                        className="img-fluid"
                      />
                    </div>

                    {/* Item Name and Quantity */}
                    <div className="col-md-8">
                      <h5>{item.Name}</h5>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Display Shipping Address */}
        <div className="mt-4 text-center">
          <h3>Shipping To:</h3>
          <p>{shippingStreet}</p>
          <p>{shippingCity}, {shippingState} {shippingZip}</p>
        </div>

        {/* Back to Home Button */}
        <div className="mt-4 text-center">
          <button onClick={goToHome} className="btn" id="shortersubmitbutton">Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Summary;