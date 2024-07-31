import '../style/login.css';
import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className='container'>
            <div className='left-side'>
                <img src='healthfiles.png' alt='MedicLab Logo' className='logo' />
            </div>

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
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default Login;
