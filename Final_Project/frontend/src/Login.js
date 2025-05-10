import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ handleAuthToggle, setUserData}) => {
    const [formData, setFormData] = useState ({
        username: "",
        password: "",
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

        try {
            const response = await fetch("http://localhost:8081/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                setIsSuccess(false);
                const errorData = await response.json();
                setMessage(errorData.message || "Log-in failed. Please try again.");
                return;
            }

            setIsSuccess(true);
            const data = await response.json();
            const { username, email } = data;

            setMessage("Log-in was successful, redirecting to the home page...");
            handleAuthToggle();
            setUserData({
                username: username,
                email: email,
            });
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            setIsSuccess(false);
            console.log(err);
            setMessage("An error has occurred. Please try again.")
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" id="userInput" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required /> <br />
                <input type="password" id="passwordInput" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <br />
                <button type="submit" id="loginButton">Login</button>
            </form><br />
            {message && (<div className="alert" style={{color: isSuccess ? 'black' : 'red', margin: 0, padding: "0 0 20px"}}>
                {message}
            </div>)}
            <Link to="/signup">Sign Up Now</Link><br />
            <hr style={{margin: "15px 0"}} />
            <Link to="/">Continue as Guest</Link>
        </div>
    );
};

export default Login;