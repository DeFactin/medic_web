import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Login from './pages/Login'
import Home
  from './pages/Home'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/"
            element={<Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
