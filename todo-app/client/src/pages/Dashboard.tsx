import React, { useEffect, useState } from 'react';
import { TodoModel } from '../models/TodoModel';
import todoIcon from '../assets/direct-hit.png';
import doingIcon from '../assets/glowing-star.png';
import doneIcon from '../assets/check-mark-button.png';
import Header from '../components/Header';
import TaskColumn from '../components/TaskColumn';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getUsername } from '../utils/auth';
import api from '../utils/api';

interface TodosResponse {
    todos: TodoModel[];
}

const Dashboard: React.FC = () => {
    const [todos, setTodos] = useState<TodoModel[]>([]);
    const [loading, setLoading] = useState(true);

    const username = getUsername();    
    const getTodos = async () => {
        try {
            const res = await api.get<TodosResponse>('/todos');
            
            setTodos(res.data.todos);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching todos', error);
        }
    };

    useEffect(() => {
        getTodos();
    }, [todos]);

    const handleDrop = async (taskId: string, newStatus: string) => {
        try {
            let status = newStatus.toLowerCase();
            if (status === "to do") {
                status = "todo";
            }
            await api.put(`/todos/${taskId}/status`, { status });
            getTodos();
        } catch (error) {
            console.error('Error updating todo status', error);
        }
    };

    const handleDelete = async (todoId: string) => {
        try {
            await api.delete(`/todos/${todoId}`);
            setTodos(existingTodos => existingTodos.filter(existingTodo => existingTodo._id !== todoId));
        } catch (error) {
            console.error('Error deleting todo', error);
        }
    };

    const handleUpdate = (updatedTask: TodoModel) => {
        setTodos(existingTodos => existingTodos.map(todo => todo._id === updatedTask._id ? updatedTask : todo));
    };

    const handleReorder = (draggedId: string, hoverId: string) => {
        setTodos((prevTodos) => {
            const draggedIndex = prevTodos.findIndex((t) => t._id === draggedId);
            const hoverIndex = prevTodos.findIndex((t) => t._id === hoverId);
            const newTodos = [...prevTodos];
            const [reorderedItem] = newTodos.splice(draggedIndex, 1);
            newTodos.splice(hoverIndex, 0, reorderedItem);
            return newTodos;
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                    <div className="flex flex-col gap-6 md:gap-0 md:flex-row justify-between items-center md:mb-4">
                        <h1 className="text-3xl font-bold text-white">
                            Welcome, <span className="text-yellow-300">{username}</span>!
                        </h1>
                        <div className='w-full md:w-[550px]'>
                            <Header refreshTodos={getTodos} />
                        </div>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard title="Total Tasks" value={todos ? todos.length.toString() : '0'} />
                        <StatCard title="Tasks in Progress" value={todos ? todos.filter(todo => todo.status === 'doing').length.toString() : '0'} />
                        <StatCard title="Completed Tasks" value={todos ? todos.filter(todo => todo.status === 'done').length.toString() : '0'} />
                        </div>
                    </div>
                    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <TaskColumn 
                            heading="To Do" 
                            icon={todoIcon}
                            tasks={todos.filter(todo => todo.status === 'todo')} 
                            onDrop={handleDrop} 
                            onDelete={handleDelete} 
                            onUpdate={handleUpdate} 
                            onReorder={handleReorder}
                        />
                        <TaskColumn 
                            heading="Doing" 
                            icon={doingIcon}
                            tasks={todos.filter(todo => todo.status === 'doing')} 
                            onDrop={handleDrop} 
                            onDelete={handleDelete} 
                            onUpdate={handleUpdate} 
                            onReorder={handleReorder}
                        />
                        <TaskColumn 
                            heading="Done" 
                            icon={doneIcon}
                            tasks={todos.filter(todo => todo.status === 'done')} 
                            onDrop={handleDrop} 
                            onDelete={handleDelete} 
                            onUpdate={handleUpdate}
                            onReorder={handleReorder}
                        />
                    </main>
                </div>
            </div>
        </DndProvider>
    );
};

const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
    <div className="bg-white bg-opacity-30 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-2xl font-bold text-yellow-300">{value}</p>
    </div>
);

export default Dashboard;