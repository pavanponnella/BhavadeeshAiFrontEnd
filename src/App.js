// import logo from './logo.svg';

// import Login from './Login';
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";       // Import Login component
import Register from "./Register";
import UnlockAccount from "./UnlockAccount";
import Enquiry from './Enquiry';
import ForgotPassword from './ForgotPassword'; 

import FormData from './FormData'; // Corrected import statement



export const ipaddredd = '10.11.54.70';
// '10.11.54.70';
// '10.11.50.142';
// 
// '192.168.1.18'; 
function App() {

  

  return (
  
    //<Login />

<Router>
            <Routes>
                <Route path="/" element={<Login />} />          {/* Default route */}
                <Route path="/login" element={<Login />} />     {/* Login page */}
                <Route path="/register" element={<Register />} /> {/* Register page */}
                <Route path="/unlock" element={<UnlockAccount />}   /> {/* Unlock Account page */}

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/enquiry" element={<  Enquiry />} />
                <Route path="/enquiryFormData" element={<FormData />} /> 

             
            </Routes>
        </Router>



    
  );
}

export default App;
