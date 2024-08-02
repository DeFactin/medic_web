import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const localString = localStorage.getItem('user');
    const tokenData = localString ? JSON.parse(localString) : {};
    const token = tokenData.token || null;

    const logout = async (username) => {

        setIsLoading(true)
        setError(null)

        const response = await fetch('https://deploy-mern-medic-api.vercel.app/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },

            body: JSON.stringify({ username })
        })

        // Check if the response is OK
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error during logout:', errorText);
            return;
        }

        // If needed, process the JSON response
        const result = await response.json();
        console.log('Logout successful:', result);

        if (response.ok) {

            // remove user from storage
            localStorage.removeItem('user')

            // dispatch logout action
            dispatch({ type: 'LOGOUT' })
            setIsLoading(false)
        }
    }
    return { logout, isLoading, error }
}