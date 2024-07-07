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
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const [currentDropTarget, setCurrentDropTarget] = useState<string | null>(null);

    const getTodos = async () => {
        try {
            const res = await axios.get<TodoModel[]>('/api/todos');
            setTodos(res.data);
        } catch (error) {
            console.error('Error fetching todos', error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const updateTodoStatus = async (id: string, status: string) => {
        try {
            await axios.put(`/api/todos/${id}/status`, { status });
            getTodos();
        } catch (error) {
            console.error('Error updating todo status', error);
        }
    };

    const todoTasks = todos.filter(todo => todo.status === 'todo');
    const doingTasks = todos.filter(todo => todo.status === 'doing');
    const doneTasks = todos.filter(todo => todo.status === 'done');

    return (
        <div className='bg-gray-800 min-h-screen text-white'>
            <Header refreshTodos={getTodos} />
            <main className='flex justify-evenly py-5 px-[8%]'>
                <TaskColumn heading="To Do" icon={todoIcon} tasks={todoTasks} setActiveCard={setActiveCard} currentDropTarget={currentDropTarget} setCurrentDropTarget={setCurrentDropTarget} updateTodoStatus={updateTodoStatus} />
                <TaskColumn heading="Doing" icon={doingIcon} tasks={doingTasks} setActiveCard={setActiveCard} currentDropTarget={currentDropTarget} setCurrentDropTarget={setCurrentDropTarget} updateTodoStatus={updateTodoStatus} />
                <TaskColumn heading="Done" icon={doneIcon} tasks={doneTasks} setActiveCard={setActiveCard} currentDropTarget={currentDropTarget} setCurrentDropTarget={setCurrentDropTarget} updateTodoStatus={updateTodoStatus} />
            </main>
            <h1>Active Card: {activeCard}</h1>
        </div>
    );
}

export default App;
