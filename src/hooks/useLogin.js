import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            const json = await response.json()

            if (!response.ok) {
                console.error('Login error:', json)
                throw new Error(json.error || 'Something went wrong')
            }

            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json })
            navigate('/home')
        } catch (err) {
            console.error('Catch block error:', err)
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}
