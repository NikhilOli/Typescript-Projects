import React, { useEffect, useState } from 'react';
import './App.css';
import { TodoModel } from './models/TodoModel';
import axios from 'axios';
import todoIcon from './assets/direct-hit.png';
import doingIcon from './assets/glowing-star.png';
import doneIcon from './assets/check-mark-button.png';
import Header from './components/Header';
import TaskColumn from './components/TaskColumn';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    const [todos, setTodos] = useState<TodoModel[]>([]);
    const [activeCard, setActiveCard] = useState<string | null>(null);

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

    const handleDrop = async (taskId: string, newStatus: string) => {
        try {
            const trimmedStatus = newStatus.trim();
            await updateTodoStatus(taskId, trimmedStatus);
        } catch (error) {
            console.error('Error updating todo status', error);
        }
    };

    const handleDelete = async (todoId: string) => {
        try {
            await axios.delete(`/api/todos/${todoId}`);
            getTodos(); // Refresh todos after deletion
        } catch (error) {
            console.error('Error deleting todo', error);
        }
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <div className='bg-gray-800 min-h-screen text-white'>
                <Header refreshTodos={getTodos} />
                <main className='flex justify-evenly py-5 px-[8%]'>
                    <TaskColumn heading="To Do" icon={todoIcon} tasks={todos.filter(todo => todo.status === 'todo')} onDrop={handleDrop} onDelete={handleDelete} />
                    <TaskColumn heading="Doing" icon={doingIcon} tasks={todos.filter(todo => todo.status === 'doing')} onDrop={handleDrop} onDelete={handleDelete} />
                    <TaskColumn heading="Done" icon={doneIcon} tasks={todos.filter(todo => todo.status === 'done')} onDrop={handleDrop} onDelete={handleDelete}/>
                </main>
            </div>
        </DndProvider>
    );
}

export default App;
