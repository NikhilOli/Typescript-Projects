import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import { isAuthenticated } from './utils/auth';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <Toaster />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;