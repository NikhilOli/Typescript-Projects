import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-gray-800 p-4">
            <div className="w-full max-w-4xl text-center md:mb-5">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Your Todo App</h1>
                <p className="text-lg md:text-2xl mb-8">Manage your tasks efficiently and effectively.</p>
                <div className="flex justify-center">
                    <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mx-2 transition duration-200">Register</a>
                    <a href="/login" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mx-2 transition duration-200">Login</a>
                </div>
            </div>
        </div>
    );
}

export default Home;
