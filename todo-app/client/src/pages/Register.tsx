import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navigate from '../utils/Navigate';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const {navigateTo} = Navigate();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!username || !email || !password) {
            return toast.error("Please fill up all required fields");
        }

        try {
            const response = await axios.post('/api/register', {
                username,
                email,
                password,
            });

            setMessage(response.data.message);
            if (response.status === 201) {
                toast.success("Registration successful")
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
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4 text-white">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 rounded-lg bg-gray-600 text-white border border-gray-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 rounded-lg bg-gray-600 text-white border border-gray-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 rounded-lg bg-gray-600 text-white border border-gray-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Register
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-400">{message}</p>}
            </div>
        </div>
    );
};

export default Register;
