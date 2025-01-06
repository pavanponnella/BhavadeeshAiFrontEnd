import React, { useState } from "react";
import './ForgotPassword.css';  // Ensure this CSS file exists
import { ipaddredd } from './App';
function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Email is required.");
            setSuccess("");
            return;
        }
        const userData = { email };
        try {
            const response = await fetch(`http://${ipaddredd}:9093/forgot-password?email=${encodeURIComponent(email)}`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const statusCode = await response.json();
            console.log("status()::" + statusCode);
            if (response.ok) {
                setSuccess(statusCode.message);
                setError("");
            } else {

                // const status = response.status;

                switch (response.status) {
                    case 401:
                        setError(statusCode.message); 
                        break;
                    case 404:
                        setError("Email not found. Please register first.");
                        break;
                    case 500:
                        setError("Server error. Please try again later.");
                        break;
                    default:
                        setError("An unexpected error occurred. Please try again.");
                }
                setSuccess("");
                // setError(status);
                // setSuccess("");
            }

        } catch (err) {
            setError("Failed to send password reset link. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className="container">
            <div className="forgot-password-form">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <label>Email  <span style={{ color: "red" }}> *</span></label>
                    <input
                        className="emal-boxinput-box"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button className="forgot-password-button" type="submit">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
