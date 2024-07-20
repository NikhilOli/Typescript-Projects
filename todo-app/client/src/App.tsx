import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col h-screen">
                <Toaster />
                <Navbar />
                <div className="flex-grow overflow-auto">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;