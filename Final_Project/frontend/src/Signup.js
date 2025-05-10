import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Signup.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const [formData, setFormData] = useState ({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8081/api/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                setMessage("Sign-up was successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setIsSuccess(false);
                const errorData = await response.json();
                setMessage(errorData.message || "Sign-up failed. Please try again.");
            }
        } catch (err) {
            setIsSuccess(false);
            setMessage("An error has occurred. Please try again.")
        }
    };

    return (
        <div className="signup-page">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" id="usernameInput" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required /> <br />
                <input type="email" id="emailInput" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /> <br />
                <input type="password" id="passwordInput" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /> <br />
                <input type="password" id="confirmPasswordInput" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                <br />
                <button type="submit" id="signupButton">Sign Up</button>
            </form><br />
            {message && (<div className="alert" style={{color: isSuccess ? 'black' : 'red', margin: 0, padding: "0 0 20px"}}>
                {message}
            </div>)}
            <Link to="/login">Already have an account? Login</Link><br />
            <hr style={{margin: "15px 0"}} />
            <Link to="/">Continue as Guest</Link>
        </div>
    );
};

export default Signup;