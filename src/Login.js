import React from "react";

function Login() {
    return (
        // <>
        <div className="container">

            <div className="enquiry">
                <h4>For Enquiry : +91 9014869842 </h4>
            </div>

            <div className="navbar">
                <a href="link" >Home</a>
                <a href="link" >services</a>
                <a href="link" >About Us</a>

                <a href="link" >Contact Us</a>

            </div>
            <div className="email-box">
                <h2>Login Here</h2>
                <label>Email</label>

                <input className="input-box" type="text" placeholder="Enter email" />
                <label>Password</label>
                <input className="input-box" type="text" placeholder="Enter password" />


                <div className="link-container">
                    <a href="https://www.google.com">Create New Account</a>
                    <a href="https://www.google.com">Forget Password?</a>
                </div>

                <button className="login-button" >Login</button>
            </div>
            <button className="login-btn" >  Login</button>

            <img src="./Bhavadeesh AI.png" alt="Logo" className="logo-image" />

            <img src="./image.png" alt="Logo" className="logoimage" />

        </div>
    );
}
export default Login;