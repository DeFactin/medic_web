import '../index.css';
import React, { useState } from 'react';
import Signup from './Signup';

const Home = () => {

    const [showSignup, setShowSignup] = useState(false); // visibility of popup

    const handleRegisterClick = () => {
        setShowSignup(true); // Show the signup popup
    };

    const handleCloseSignup = () => {
        setShowSignup(false); // Hide the signup popup
    };

    return (
        <div className="home-container">
            <button onClick={handleRegisterClick} >Register</button>
            {showSignup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-button" onClick={handleCloseSignup}>Close</button>
                        <Signup />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
