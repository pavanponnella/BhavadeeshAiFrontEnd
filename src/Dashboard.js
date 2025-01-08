import React from 'react';

import  './DashBoard.css';
function DashBoard() {
    return (
        <div className='DashBoard'>
            <h1>Welcome to DashBoard Page, Thank's for Registering on Application</h1>
            <div className='DashBoardLinks'>
                <a href='/enquiry' className='DashBoardLink'>Create Enquiry</a>
                <a href='/enquiryFormData' className='DashBoardLink'>View Enquiry</a>
            </div>
        </div>
    );
}
export default DashBoard;
