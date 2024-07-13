import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';

function App() {
    return (
        <BrowserRouter>
            <Toaster />
            <Routes>
                <Route path='/' element={<> <h1 className='text-white'>Main Page Content coming soon...</h1></>} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
