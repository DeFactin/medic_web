import '../style/navbar.css';
import '../style/userDetails.css'
import React, { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Signup from '../pages/Signup';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [showSignup, setShowSignup] = useState(false); // Visibility of popup

    const handleRegisterClick = () => {
        setShowSignup(true); // Show the signup popup
    };

    const handleCloseSignup = () => {
        setShowSignup(false); // Hide the signup popup
    };

    const handleClick = () => {
        if (user?.username) {
            console.log('Logging out user:', user.username);
            logout(user.username);
        } else {
            console.error('No username found for logout');
        }
        navigate('/');
    };

    return (
        <div>
            <header>
                <div className="title">
                    <h2>MedicLab</h2>
                </div>
                {user && (
                    <div className="actions">
                        <h2>{user.username}</h2>
                        <button className='buttonLog' onClick={handleClick}>Log out</button>
                        <button className='buttonLog' onClick={handleRegisterClick}>Register</button>
                    </div>
                )}
            </header>
            {showSignup && (
                <div className="register-overlay">
                    <div className="register-content">
                        <p className='closeButton' onClick={handleCloseSignup}>X</p>
                        <Signup />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
