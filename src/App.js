import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import './App.css'
import { useAuthContext } from './hooks/useAuthContext'


function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={user ? <><Navbar /> <Home /> </> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={!user ? <Login /> : <Navigate to="/home" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
