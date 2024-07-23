import React, { useState } from 'react';
import Button from './Button';
import api from '../utils/api';

interface HeaderProps {
    refreshTodos: () => void;
}

const Header: React.FC<HeaderProps> = ({ refreshTodos }) => {
    const [task, setTask] = useState<string>("");

    const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const newTodo = {
                todo: task,
            };

            const res = await api.post('/todos', newTodo);

            if (res.status === 201) {
                setTask("");
                refreshTodos();
            }
        } catch (error) {
            console.error('Error creating todo', error);
        }
    };

    return (
        <header className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-sm mb-6 p-4 rounded-xl">
            <div className="max-w-7xl">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <input
                        onChange={handleTask}
                        value={task}
                        className="w-full sm:flex-1 px-3 py-2 text-sm md:text-base border border-white rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white bg-opacity-20 text-white placeholder-gray-300"
                        type="text"
                        placeholder='Enter your task'
                    />
                    <Button
                        title="Add Todo"
                        onClick={() => {}}
                        className="w-full sm:w-auto px-4 py-2 bg-yellow-400 text-gray-800 text-sm md:text-base rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                    />
                </form>
            </div>
        </header>
    );
};

export default Header;