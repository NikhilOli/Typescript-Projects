import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { isAuthenticated, getUsername, removeToken, removeUsername } from '../utils/auth';
import Navigate from '../utils/Navigate';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { navigateTo } = Navigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        removeToken();
        removeUsername();
        navigateTo('/login');
    };

    const username = getUsername();

    return (
        <nav className="bg-gray-200 text-gray-800">
            <div className="mx-auto px-4 py-2 flex justify-between items-center">
                <div className="text-2xl font-bold md:mx-10">
                    <Link to="/">TodoApp</Link>
                </div>
                <div className="hidden md:flex space-x-4 md:gap-8 md:mx-10">
                    <Link to="/" className="hover:text-gray-400">Home</Link>
                    {isAuthenticated() && (
                        <Link to="/dashboard" className="hover:text-gray-400">Todos</Link>
                    )}
                    {!isAuthenticated() && (
                        <>
                            <Link to="/register" className="hover:text-gray-400">Register</Link>
                            <Link to="/login" className="hover:text-gray-400">Login</Link>
                        </>
                    )}
                    {isAuthenticated() && (
                        <>
                            <span className="hover:text-gray-400">Welcome, {username}</span>
                            <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
                        </>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-black focus:outline-none">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>Home</Link>
                    {isAuthenticated() && (
                        <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>Todos</Link>
                    )}
                    {!isAuthenticated() && (
                        <>
                            <Link to="/register" className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>Register</Link>
                            <Link to="/login" className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>Login</Link>
                        </>
                    )}
                    {isAuthenticated() && (
                        <>
                            <span className="block py-2 px-4 hover:bg-gray-700">Welcome, {username}</span>
                            <button onClick={handleLogout} className="block w-full text-left py-2 px-4 hover:bg-gray-700">Logout</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;