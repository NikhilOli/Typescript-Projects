import React, { useState, useRef, useEffect } from 'react';
import { TodoModel } from '../models/TodoModel';
import Button from './Button';

interface EditTaskProps {
    task: TodoModel;
    onSave: (updatedTask: TodoModel) => void;
    onCancel: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onSave, onCancel }) => {
    const [todo, setTodo] = useState(task.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSave = () => {
        if (todo.trim()) {
            const updatedTask = { ...task, todo: todo.trim() };
            onSave(updatedTask);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            onCancel();
        }
    };

    return (
        <div className='flex flex-col items-start p-4 bg-white bg-opacity-30 rounded-lg w-full'>
            <input
                ref={inputRef}
                className='w-full p-2 mb-4 text-white bg-white bg-opacity-20 rounded-lg border border-white'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className='flex gap-2'>
                <Button title='Save' onClick={handleSave} className='bg-yellow-400 text-gray-800 p-2 rounded-lg' />
                <Button title='Cancel' onClick={onCancel} className='bg-red-400 text-white p-2 rounded-lg' />
            </div>
        </div>
    );
};

export default EditTask;