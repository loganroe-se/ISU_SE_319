import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import About from './About';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import ProductView from './ProductView';
import Checkout from './Checkout';
import Account from './Account';
import Summary from './Summary';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [shippingStreet, setShippingStreet] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingZip, setShippingZip] = useState("");


  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <Router>
      <LocationBasedBodyClass />

      {/* Toast Notifications */}
      <ToastContainer />

      <LocationBasedHeader isLoggedIn={isLoggedIn} handleAuthToggle={toggleAuth} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} cartTotal={cartTotal} setCartTotal={setCartTotal} shippingStreet={shippingStreet} setShippingStreet={setShippingStreet} shippingCity={shippingCity} setShippingCity={setShippingCity} shippingState={shippingState} setShippingState={setShippingState} shippingZip={shippingZip} setShippingZip={setShippingZip}/>} />
        <Route path="/login" element={<Login handleAuthToggle={toggleAuth} setUserData={setUserData} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account handleAuthToggle={toggleAuth} userData={userData} setUserData={setUserData} />} />
        <Route path="/product/:name" element={<ProductView cart={cart} setCart={setCart} cartTotal={cartTotal} setCartTotal={setCartTotal} />} />
        <Route path="/summary" element={<Summary cart={cart} setCart={setCart} cartTotal={cartTotal} setCartTotal={setCartTotal} shippingStreet={shippingStreet} shippingCity={shippingCity} shippingState={shippingState} shippingZip={shippingZip}/>} />
      </Routes>
    </Router>
  );
};

const LocationBasedHeader = ({ isLoggedIn, handleAuthToggle }) => {
  const location = useLocation();

  // Only render Header when the current path is not '/login' and not '/signup'
  if (location.pathname === '/login' || location.pathname === '/signup') return null;

  return <Header isLoggedIn={isLoggedIn} handleAuthToggle={handleAuthToggle} />;
};

const LocationBasedBodyClass = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      document.body.classList.add('login-page-body');
    } else {
      document.body.classList.remove('login-page-body');
    }
  }, [location]);

  return null;
};

export default App;