// Login.js
import React, { useState, useEffect } from "react";
import './Login.css';
import { Link } from "react-router-dom";
import { ipaddredd } from './App';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (email || password) {
            setError("");
        }
    }, [email, password]);

    useEffect(() => {
        if (success) {
            navigate('/DashBoardPage');
        }
    }, [success, navigate]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and Password are required.");
            setSuccess("");
            return;
        }

        try {
            const response = await fetch(`http://${ipaddredd}:9093/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess(data.message);
                setError("");
            } else {
                switch (response.status) {
                    case 400:
                        setError(data.message);
                        break;
                    default:
                        setError("An unexpected error occurred. Please try again.");
                        break;
                }
                setSuccess("");
            }
        } catch (err) {
            setError("Error connecting to server. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className="container">
            <div className="enquiry">
                <h4>For Enquiry : +91 9000000000 </h4>
            </div>
            <a href="https://www.youtube.com/watch?v=9Crrhz0pm8s&t=193s" className="youtube-container">
                <img src="./youtubeicon.png" alt="Logo" className="youtubeicon" />
                <span>Our Free Tutorials</span>
            </a>
            <div className="navbar">
                <a href="/">Home</a>
                <a href="link">Services</a>
                <a href="link">About Us</a>
                <a href="https://pavanponnellaportfolio.vercel.app/">Contact Us</a>
            </div>
            <div className="email-box">
                <h2>Login Here</h2>
                {error && <p style={{ color: "red" }}>{error}</p>} 
                {success && <p style={{ color: "green" }}>{success}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Email<span style={{ color: "red" }}> *</span></label>
                    <input
                        className="input-box"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <label>Password<span style={{ color: "red" }}> *</span></label>
                    <input
                        className="input-box"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <div className="link-container">
                        <Link to="/register">Create New Account</Link>
                        <Link to="/forgot-password">Forget Password?</Link>
                    </div>

                    <button className="login-button" type="submit">Login</button>
                </form>
            </div>
            <div className="line"></div>
            {/* <img src="./springboot.jpg" alt="Logo" className="logo-image" /> */}
            <div className="vertical-line"></div>
        </div>
    );
}

export default Login;
