import React, { useState } from 'react';
import { TodoModel } from '../models/TodoModel';
import Button from './Button';

interface EditTaskProps {
    task: TodoModel;
    onSave: (updatedTask: TodoModel) => void;
    onCancel: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onSave, onCancel }) => {
    const [todo, setTodo] = useState(task.todo);

    const handleSave = () => {
        const updatedTask = { ...task, todo };
        onSave(updatedTask);
    };

    return (
        <div className='flex flex-col items-start p-4 bg-gray-800 rounded-lg w-full'>
            <input
                className='w-full p-2 mb-4 text-black rounded-lg'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <div className='flex gap-2'>
                <Button title='Save' onClick={handleSave} className='bg-blue-500 text-white p-2 rounded-lg' />
                <Button title='Cancel' onClick={onCancel} className='bg-red-500 text-white p-2 rounded-lg' />
            </div>
        </div>
    );
};

export default EditTask;
