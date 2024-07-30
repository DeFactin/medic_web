import '../index.css' // Importing CSS for Home component if needed
import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
    };

    return (
        <div className="home-container">
            <h2>Welcome to MedicLab</h2>
            <p>Your one-stop solution for medical needs.</p>
            <p>Explore our services, products, and more!</p>

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
                    <button disabled={isLoading}>Log in</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>

        </div>
    );
}

export default Login;
