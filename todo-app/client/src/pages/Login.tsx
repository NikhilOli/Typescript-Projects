import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Navigate from '../utils/Navigate';
import { setToken, setUsernameFromBackend } from '../utils/auth';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { navigateTo } = Navigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                email,
                password,
            });

            if (response.status === 200) {
                toast.success('Login successful');
                setToken(response.data.token);
                setUsernameFromBackend(response.data.username);
                setEmail('');
                setPassword('');
                navigateTo('/')
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>
                <form onSubmit={handleLogin}>
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
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-white">Don't have an account?</p>
                    <Link to="/register" className="text-yellow-300 hover:text-yellow-400 font-bold">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;