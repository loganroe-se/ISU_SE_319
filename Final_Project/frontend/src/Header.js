import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({ isLoggedIn, handleAuthToggle }) => {
    const navigate = useNavigate();

    // Handle a toast notification for logging out
    const handleLogout = () => {
        navigate("/");
        toast.success("You have logged out!");
        handleAuthToggle();
    };

    return (
        <>
            <nav className="navbar custom-navbar">
                <div className="container-fluid custom-navbar-bg">
                    <div className="container d-flex justify-content-between align-items-center">
                        <Link className="navbar-brand custom-brand" to="/">ShopDrop</Link>

                        {/* Links */}
                        <div className="d-flex align-items-center">
                            {/* About Link */}
                            <Link className="nav-link custom-nav-link me-3" to="/about">About</Link>
                            {/* Checkout Link */}
                            <Link className="nav-link custom-nav-link me-3" to="/checkout">Checkout</Link>

                            {/* Log In/Log Out Button */}
                            {isLoggedIn ? (
                                <div className="dropdown">
                                    <button className="btn log-check-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        Account
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li>
                                            <Link className="dropdown-item" to="/account">View Account</Link>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <Link className="btn log-check-btn" to="/login">
                                    Log In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;