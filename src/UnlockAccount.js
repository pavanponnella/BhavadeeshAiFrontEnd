import React, { useState } from "react";
import './UnlockAccount.css'; // Style file for UnlockAccount
import { ipaddredd } from './App';
function UnlockAccount() {
    const [email, setEmail] = useState("");
    const [tempPassword, setTempPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !tempPassword || !newPassword || !confirmPassword) {
            setError("All fields are required.");
            setSuccess("");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password must match.");
            setSuccess("");
            return;
        }
      
        try {
            setError("");
            setSuccess("");
            const response = await fetch("http://"+ipaddredd+":9093/unlock_account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, tempPassword, newPassword , confirmPassword }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess(data.message);
                setError("");

                setTimeout(() => {
                    window.location.href = "http://"+ipaddredd+":3000/";
                }, 1000);
                 
            } else {
                setError(data.message);
                setSuccess("");
                setEmail("");
                setTempPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
          
        } catch (err) {
            setError(err.message);
            setSuccess("");
        }
    };

    return (
        <div className="container">
            <div className="unlock-account-form">
                <h2>Unlock Account</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <label>Email   <span style={{color: "red"}}> *</span></label>
                    <input
                        className="input-box"
                        type="email"
                        placeholder="Enter Registered Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Temporary Password  <span    style={  {color:"red"}} > *</span> </label>
                    <input
                        className="input-box"
                        type="password"
                        placeholder="Enter Temporary Password"
                        value={tempPassword}
                        onChange={(e) => setTempPassword(e.target.value)}
                    />

                    <label>New Password <span style={{color:"red"}}> *</span>    </label>
                    <input
                        className="input-box"
                        type="password"
                        placeholder="Enter New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <label>Confirm Password <span style={{color: "red"}}> *</span>  </label>
                    <input
                        className="input-box"
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button className="unlock-button" type="submit">Unlock Account</button>
                </form>
            </div>
        </div>
    );
}

export default UnlockAccount;
