import React, { useEffect, useState } from 'react';
import './App.css';
import { TodoModel } from './models/TodoModel';
import axios from 'axios';
import todoIcon from './assets/direct-hit.png';
import doingIcon from './assets/glowing-star.png';
import doneIcon from './assets/check-mark-button.png';
import Header from './components/Header';
import TaskColumn from './components/TaskColumn';

function App() {
    const [todos, setTodos] = useState<TodoModel[]>([]);

    useEffect(() => {
        const getTodos = async () => {
            try {
                const res = await axios.get<TodoModel[]>('/api/todos');
                setTodos(res.data);
            } catch (error) {
                console.error('Error fetching todos', error);
            }
        };
        getTodos();
    }, []);

    // Splitting tasks into columns based on index for simplicity
    const todoTasks = todos.slice(0, Math.ceil(todos.length / 3));
    const doingTasks = todos.slice(Math.ceil(todos.length / 3), 2 * Math.ceil(todos.length / 3));
    const doneTasks = todos.slice(2 * Math.ceil(todos.length / 3));

    return (
        <div className='bg-gray-800 min-h-screen text-white'>
            <Header />
            <main className='flex justify-evenly py-5 px-[8%]'>
                <TaskColumn heading="To Do" icon={todoIcon} tasks={todoTasks} />
                <TaskColumn heading="Doing" icon={doingIcon} tasks={doingTasks} />
                <TaskColumn heading="Done" icon={doneIcon} tasks={doneTasks} />
            </main>
        </div>
    );
}

export default App;
