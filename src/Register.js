import React, { useState } from "react";
import './Register.css';
import { ipaddredd } from './App';
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isRegistered, setIsRegistered] = useState(false); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidPhoneNumber = (number) => {
            return /^[0-9]{10}$/.test(number);
        };
        if (!name || !email || !phoneNumber) {
            setError("All fields are required.");
            setSuccess("");
            return;
        }
       
        const userData = { name, email, phoneNumber };
        if (!isValidPhoneNumber(phoneNumber)) {
            setError("Phone number must be exactly 10 digits.");
            setSuccess("");
            return;
        }

       
        try {
            const response = await fetch("http://"+ipaddredd+":9093/sign_UP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
        
            const data = await response.json();
            if (response.ok) {
                setSuccess(data.message); // Set success message
                setError(""); // Clear previous error messages
                setIsRegistered(true);
            } else {
                switch (response.status) {
                    case 400:
                        setError(data.message); // Handle 400 error
                        break;
                    case 409:
                        setError(data.message); // Handle 409 error
                        break;
                    default:
                        setError("An unexpected error occurred. Please try again.");
                        break;
                }
                setSuccess(""); // Clear success message if there's an error
            }
        } catch (err) {
            setError(err.message); // Handle network errors
            setSuccess(""); // Clear success message
        }
        
    };

    return (
        <div className="container">
            <div className="register-form">
                <h2>Register Here</h2>
    
                {/* Conditional rendering */}
                {isRegistered ? (
                    // Show only success message after successful registration
                    <p className="success-message">{success}</p>
                ) : (
                    // Show form when not registered
                    <form onSubmit={handleSubmit}>
                        {error && <p className="error-message">{error}</p>}
    
                        <label>Name <span style={{ color: "red" }}> *</span></label>
                        <input
                            className="input-box"
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
    
                        <label>Email <span style={{ color: "red" }}> *</span></label>
                        <input
                            className="input-box"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
    
                        <label>Phone Number <span style={{ color: "red" }}> *</span></label>
                        <input
                        className="input-box"
                        type="text"
                        placeholder="Enter Phone Number"
                        value={phoneNumber}
                        onChange={(e) => {
                            const input = e.target.value;
                            // Only allow numeric input and ensure it's a valid 10-digit number
                            if (/^[0-9]{0,10}$/.test(input)) {
                                setPhoneNumber(input);
                            }
                        }}
                    />
    
                        <button className="register-button" type="submit">Register</button>
                    </form>
                )}
            </div>
        </div>
    );
    
}

export default Register;
