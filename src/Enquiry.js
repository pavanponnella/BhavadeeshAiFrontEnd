import React, { useState, useEffect } from "react";
import './Enquiry.css';
import { ipaddredd } from './App';

function Enquiry() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [courseName, setCourseName] = useState("");
    const [enquiryStatus, setEnquiryStatus] = useState("");
    const [classMode, setClassMode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isEnquired, setIsEnquired] = useState(false); 
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await fetch(`http://${ipaddredd}:9093/enquiry`);
                if (response.ok) {
                    const data = await response.json();
                    setStatuses(data);
                } else {
                    throw new Error("Failed to fetch enquiry statuses.");
                }
            } catch (err) {
                setError("Error fetching enquiry statuses: " + err.message);
            }
        };

        fetchStatuses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidPhoneNumber = (number) => /^[0-9]{10}$/.test(number);

        if (!name || !phoneNumber || !courseName || !enquiryStatus || !classMode) {
            setError("All fields are required.");
            setSuccess("");
            return;
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            setError("Phone number must be exactly 10 digits.");
            setSuccess("");
            return;
        }

        const enquiryData = { name, phoneNumber, courseName, enquiryStatus, classMode };

        try {
            const response = await fetch(`http://${ipaddredd}:9093/enquiry/statuses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(enquiryData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message);
                setError("");
                setIsEnquired(true);
            } else {
                setError(data.message || "An unexpected error occurred. Please try again.");
                setSuccess("");
            }
        } catch (err) {
            setError("Fetch Error: " + err.message);
            setSuccess("");
        }
    };

    return (
        <div className="container">
            <div className="enquiry-form">
                <h2>Enquiry Form</h2>

                {isEnquired ? (
                    <p className="success-message">{success}</p>
                ) : (
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

                        <label>Phone Number <span style={{ color: "red" }}> *</span></label>
                        <input
                            className="input-box"
                            type="text"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(e) => {
                                const input = e.target.value;
                                if (/^[0-9]{0,10}$/.test(input)) {
                                    setPhoneNumber(input);
                                }
                            }}
                        />

                        <label>Course Name <span style={{ color: "red" }}> *</span></label>
                        <select
                            className="input-box"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        >
                            <option value="">Select Course</option>
                            <option value="Java">Java</option>
                            <option value="Python">Python</option>
                            <option value="DevOps">DevOps</option>
                            <option value="React.js">React.js</option>
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                        </select>

                        <label>Enquiry Status <span style={{ color: "red" }}> *</span></label>
                        <select
                            className="input-box"
                            value={enquiryStatus}
                            onChange={(e) => setEnquiryStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            {statuses.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </select>

                        <label>Class Mode <span style={{ color: "red" }}> *</span></label>
                        <select
                            className="input-box"
                            value={classMode}
                            onChange={(e) => setClassMode(e.target.value)}
                        >
                            <option value="">Select Class Mode</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>

                        <button className="enquiry-button" type="submit">Submit Enquiry</button>
                    </form>
                )}
            </div>
        </div>
    );
}



export default Enquiry;
