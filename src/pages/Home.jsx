import '../index.css';
import React, { useState } from 'react';
import Signup from './Signup';
import { useEffect } from 'react'
import { useUsersContext } from "../hooks/useUsersContext"
import { useAuthContext } from "../hooks/useAuthContext"
import UserDetails from '../components/userDetails'

const Home = () => {

    const [showSignup, setShowSignup] = useState(false); // visibility of popup

    const handleRegisterClick = () => {
        setShowSignup(true); // Show the signup popup
    };

    const handleCloseSignup = () => {
        setShowSignup(false); // Hide the signup popup
    };

    const { users, dispatch } = useUsersContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_USERS', payload: json })
            }
        }

        if (user) {
            fetchUsers()
        }
    }, [dispatch, user])

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
            <div className='users'>
                {users && users.map((userDetail) => (
                    <UserDetails key={userDetail._id} userDetail={userDetail} />
                ))}
            </div>
        </div>
    );
}

export default Home;
