import '../style/home.css';
import React from 'react';
import { useEffect } from 'react'
import { useUsersContext } from "../hooks/useUsersContext"
import { useAuthContext } from "../hooks/useAuthContext"
import UserDetails from '../components/userDetails'

const Home = () => {

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
            <div className='users'>
                {users && users.map((userDetail) => (
                    <UserDetails key={userDetail._id} userDetail={userDetail} />
                ))}
            </div>
        </div>
    );
}

export default Home;
