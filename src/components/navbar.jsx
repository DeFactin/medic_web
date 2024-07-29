import React, { useState } from 'react';
import '../index.css';

const Navbar = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Username:', username);
        console.log('Password:', password);
        setIsPopupOpen(false); // Close the popup on submit
    };

    return (
        <div>
            <header>
                <div>
                    <h1>MedicLab</h1>
                    <button onClick={handleLoginClick}>Log In</button>
                </div>
            </header>
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => setIsPopupOpen(false)}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
