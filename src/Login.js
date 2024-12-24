import React from "react";
import './Login.css';
function Login() {
    return (
        <div className="container">

            <div className="enquiry">
                <h4>For Enquiry : +91 9014869842 </h4>
            </div>
            <a href="https://www.youtube.com/watch?v=9Crrhz0pm8s&t=193s" className="youtube-container">
                <img src="./youtubeicon.png" alt="Logo" className="youtubeicon" />
                <span>Our Free Tutorials</span>
            </a>



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
                <a className="login-button" href="http://10.11.54.70:8080/LoginSucessfull">Login</a>
                {/* <button className="login-button" >Login</button> */}
            </div>

            <a className="login-btn" href="http://10.11.54.70:8080/LoginSucessfull">Login</a>
            {/* <button className="login-btn" >  Login</button> */}
            <div className="line"></div> {/* Custom line using div */}
            <img src="./Bhavadeesh AI.png" alt="Logo" className="logo-image" />
            <div className="vertical-line"></div>
            <img src="./image.png" alt="Logo" className="logoimage" />

        </div>
    );
}
export default Login;