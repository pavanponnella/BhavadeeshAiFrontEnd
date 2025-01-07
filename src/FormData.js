import React, { useState, useEffect } from 'react';
import './FormData.css';
import { ipaddredd } from './App';

function FormData() {
    const [formData, setFormData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://${ipaddredd}:9093/enquiryFormData`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="form-container">
            <h2>Enquiry Form Data</h2>
            {error && <p className="error-message">{error}</p>}
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Class Mode</th>
                        <th>Course Name</th>
                        <th>Enquiry Status</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.classMode}</td>
                            <td>{item.courseName}</td>
                            <td>{item.enquiryStatus}</td>
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FormData;
