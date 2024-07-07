import React, { useState } from 'react';
import axios from 'axios';

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
                refreshTodos(); // Refresh the todos list after a successful addition
            }
        } catch (error) {
            console.error('Error creating todo', error);
        }
    };

    return (
        <header className='flex items-center justify-center border-b-[1px] border-b-[#dcdcdc] my-10 py-10'>
            <form onSubmit={handleSubmit} className='w-[50%]'>
                <input
                    onChange={handleTask}
                    value={task}
                    className='text-xl border rounded-md px-3 py-2 mb-4 w-full border-[#dfe3e6] bg-[#f9f9f9] text-black placeholder-[#686868] font-medium'
                    type="text"
                    placeholder='Enter Your Task'
                />
                <div className='flex items-center justify-center gap-3'>
                    <button
                        type="submit"
                        className='text-[16px] rounded-md font-medium bg-[#6457f9] h-10 py-[3px] px-[13px] text-white border-none cursor-pointer'
                    >
                        +Add Task
                    </button>
                </div>
            </form>
        </header>
    );
};

export default Header;
