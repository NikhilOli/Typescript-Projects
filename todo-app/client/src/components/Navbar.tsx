import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-200 text-gray-800">
            <div className="mx-auto px-4 py-2 flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/">TodoApp</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="hover:text-gray-400">Home</Link>
                    <Link to="/dashboard" className="hover:text-gray-400">Todos</Link>
                    <Link to="/register" className="hover:text-gray-400">Register</Link>
                    <Link to="/login" className="hover:text-gray-400">Login</Link>
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
                    <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>Todos</Link>
                    <Link to="/register" className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>Register</Link>
                    <Link to="/login" className="block py-2 px-4 hover:bg-gray-700" onClick={toggleMenu}>Login</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
