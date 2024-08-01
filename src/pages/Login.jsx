import '../style/login.css';
import React, { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import SPLoader from '../components/spinnerLoader';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();
    const [showError, setShowError] = useState(false);
    const [spinnerVisible, setSpinnerVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowError(false);
        setSpinnerVisible(true);

        const delay = 500; // half a second
        const startTime = Date.now();

        try {
            await login(username, password);
        } catch (err) {
            console.error(err); // Optional: log error for debugging
        } finally {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, delay - elapsedTime);

            setTimeout(() => {
                setSpinnerVisible(false);

                // Show error message after spinner has finished spinning
                if (error) {
                    setShowError(true);
                }
            }, remainingTime);
        }
    };

    useEffect(() => {
        if (!isLoading && error) {
            // Display error message after spinner duration
            const delay = 500; 
            const timer = setTimeout(() => {
                setShowError(true);
            }, delay);
            
            return () => clearTimeout(timer);
        }
    }, [isLoading, error]);

    return (
        <div className='container'>
            <div className='left-side'>
                <img src='healthfiles.png' alt='MedicLab Logo' className='logo' />
            </div>
            {spinnerVisible && (
                <div className='spinner-container'>
                    <SPLoader />
                </div>
            )}
            <div className='right-side'>
                <form onSubmit={handleSubmit} className='login-form'>
                    <h2>Login</h2>
                    <div className='form-group'>
                        <label htmlFor='username'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' disabled={isLoading}>Log in</button>
                    <div className={`error-message ${showError ? 'show' : ''}`}>
                        {error}
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Login;
