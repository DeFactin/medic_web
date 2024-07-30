import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const logout = async (username) => {

        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/logout/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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