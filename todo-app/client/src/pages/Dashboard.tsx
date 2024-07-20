import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TodoModel } from '../models/TodoModel';
import todoIcon from '../assets/direct-hit.png';
import doingIcon from '../assets/glowing-star.png';
import doneIcon from '../assets/check-mark-button.png';
import Header from '../components/Header';
import TaskColumn from '../components/TaskColumn';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Dashboard: React.FC = () => {
    const [todos, setTodos] = useState<TodoModel[]>([]);

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
            let status = newStatus.toLowerCase();
            if (status === "to do") {
                status = "todo";
            }
            await updateTodoStatus(taskId, status);
        } catch (error) {
            console.error('Error updating todo status', error);
        }
    };

    const handleDelete = async (todoId: string) => {
        setTodos(existingTodos => existingTodos.filter(existingTodo => existingTodo._id !== todoId));
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

    return (
        <DndProvider backend={HTML5Backend}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <Header refreshTodos={getTodos} />
            <main className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
    </DndProvider>
    );
};

export default Dashboard;