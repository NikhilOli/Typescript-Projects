import React from 'react';
import { getUsername, isAuthenticated } from '../utils/auth';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const username: string | null = getUsername();
    
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-4xl w-full">
                {isAuthenticated() && username ? (
                    <LoggedInView username={username} />
                ) : (
                    <LoggedOutView />
                )}
            </div>
        </div>
    );
}

interface LoggedInViewProps {
    username: string;
}

const LoggedInView: React.FC<LoggedInViewProps> = ({ username }) => (
    <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Welcome back, <span className="text-yellow-300">{username}</span>!
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white">
            Ready to boost your productivity today?
        </p>
        <div className="mt-8">
            <Link to="/dashboard" className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                Go to Dashboard
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <StatCard title="Tasks Completed" value="12" />
            <StatCard title="Current Streak" value="5 days" />
            <StatCard title="Productivity Score" value="85%" />
        </div>
    </div>
);

const LoggedOutView: React.FC = () => (
    <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Welcome to Your <span className="text-yellow-300">Todo App</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white">
            Organize your life, boost your productivity, and achieve your goals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <FeatureCard />
            <GetStartedCard />
        </div>
    </div>
);

interface StatCardProps {
    title: string;
    value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
    <div className="bg-white bg-opacity-30 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-3xl font-extrabold text-yellow-300">{value}</p>
    </div>
);

const FeatureCard: React.FC = () => (
    <div className="bg-white bg-opacity-30 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Features</h2>
        <ul className="list-disc list-inside text-white">
            <li>Create and manage tasks</li>
            <li>Set priorities and deadlines</li>
            <li>Track your progress</li>
            <li>Collaborate with others</li>
        </ul>
    </div>
);

const GetStartedCard: React.FC = () => (
    <div className="bg-white bg-opacity-30 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Get Started</h2>
        <p className="text-white mb-4">
            Join now to start organizing your tasks and boosting your productivity!
        </p>
        <div className="flex flex-col space-y-4">
            <Link to="/register" className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                Register
            </Link>
            <Link to="/login" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                Login
            </Link>
        </div>
    </div>
);

export default Home;