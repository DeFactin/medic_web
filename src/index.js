import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { UsersContextProvider } from './context/usersContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UsersContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </UsersContextProvider>
  </React.StrictMode>
);
