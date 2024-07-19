import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';

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

            const res = await axios.post('/api/todos', newTodo);

            if (res.status === 201) {
                setTask("");
                refreshTodos();
            }
        } catch (error) {
            console.error('Error creating todo', error);
        }
    };

    return (
        <header className="bg-gray-100 shadow-sm mb-6">
            <div className="max-w-7xl mx-auto py-4 md:py-6 px-4 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <input
                        onChange={handleTask}
                        value={task}
                        className="w-full sm:flex-1 px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                        type="text"
                        placeholder='Enter your task'
                    />
                    <Button
                        title="Add Task"
                        onClick={() => {}}
                        className="w-full sm:w-auto px-4 py-2 bg-black text-white text-sm md:text-base rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    />
                </form>
            </div>
        </header>
    );
};

export default Header;