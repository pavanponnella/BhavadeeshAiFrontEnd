import React, { useState, useEffect } from 'react';
import './FormData.css';
import { ipaddredd } from './App';

function FormData() {
    const [formData, setFormData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        classMode: '',
        courseName: '',
        enquiryStatus: ''
    });

    const [dropdownValues, setDropdownValues] = useState({
        classModes: [],
        courseNames: [],
        enquiryStatuses: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://${ipaddredd}:9093/enquiryFormData`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                    setFilteredData(data); // Initially display all data

                    // Extract unique values for the dropdowns
                    const classModes = [...new Set(data.map(item => item.classMode))];
                    const courseNames = [...new Set(data.map(item => item.courseName))];
                    const enquiryStatuses = [...new Set(data.map(item => item.enquiryStatus))];

                    setDropdownValues({
                        classModes,
                        courseNames,
                        enquiryStatuses
                    });
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    useEffect(() => {
        // Filter the formData based on the filters
        const filtered = formData.filter(item => {
            return (
                (filters.classMode ? item.classMode.toLowerCase().includes(filters.classMode.toLowerCase()) : true) &&
                (filters.courseName ? item.courseName.toLowerCase().includes(filters.courseName.toLowerCase()) : true) &&
                (filters.enquiryStatus ? item.enquiryStatus.toLowerCase().includes(filters.enquiryStatus.toLowerCase()) : true)
            );
        });
        setFilteredData(filtered);
    }, [filters, formData]);

    return (
        <div className="form-container">
            <h2>Enquiry Form Data</h2>
            {error && <p className="error-message">{error}</p>}
            
            {/* Search filters as dropdowns */}
            <div className="search-filters">
                <select
                    name="classMode"
                    value={filters.classMode}
                    onChange={handleSearchChange}
                >
                    <option value="">Select Class Mode</option>
                    {dropdownValues.classModes.map((classMode, index) => (
                        <option key={index} value={classMode}>
                            {classMode}
                        </option>
                    ))}
                </select>

                <select
                    name="courseName"
                    value={filters.courseName}
                    onChange={handleSearchChange}
                >
                    <option value="">Select Course Name</option>
                    {dropdownValues.courseNames.map((courseName, index) => (
                        <option key={index} value={courseName}>
                            {courseName}
                        </option>
                    ))}
                </select>

                <select
                    name="enquiryStatus"
                    value={filters.enquiryStatus}
                    onChange={handleSearchChange}
                >
                    <option value="">Select Enquiry Status</option>
                    {dropdownValues.enquiryStatuses.map((status, index) => (
                        <option key={index} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
            
            {/* Data Table */}
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
                    {filteredData.map((item, index) => (
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
