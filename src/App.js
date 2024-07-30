import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Login'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
