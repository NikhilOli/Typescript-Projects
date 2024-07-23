import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navigate from '../utils/Navigate';
import { setToken, setUsernameFromBackend } from '../utils/auth';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { navigateTo } = Navigate();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!username || !email || !password) {
            return toast.error("Please fill up all required fields");
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/register`, {
                username,
                email,
                password,
            });

            setMessage(response.data.message);
            if (response.status === 201) {
                toast.success("Registration successful")
                setToken(response.data.token);
                setUsernameFromBackend(response.data.username);  
                setUsername('');
                setEmail('');
                setPassword('');
                navigateTo("/login")
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white placeholder-gray-300"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white placeholder-gray-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white placeholder-gray-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                        Register
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-white">{message}</p>}
                <div className="mt-6 text-center">
                    <p className="text-white">Already have an account?</p>
                    <Link to="/login" className="text-yellow-300 hover:text-yellow-400 font-bold">
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;