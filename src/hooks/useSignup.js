import { useState } from 'react'
import { useUsersContext } from './useUsersContext'
import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useUsersContext()
    const navigate = useNavigate()

    const signup = async (username, password, name, orders, image, birthdate) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, name, orders, image, birthdate })
            })

            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'REGISTER', payload: json })
                navigate(0)
            } else {
                setError(json.error)
            }
        } catch (err) {
            setError('An error occurred during signup')
        } finally {
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}
