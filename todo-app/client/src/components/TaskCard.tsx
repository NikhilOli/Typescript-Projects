import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { TodoModel } from '../models/TodoModel';
import axios from 'axios';
import EditTask from './EditTask';

interface TaskCardProps {
    task: TodoModel;
    onDelete: (todoId: string) => void;
    onUpdate: (updatedTask: TodoModel) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdate }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task._id, status: task.status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.5 : 1;

    const handleDelete = async () => {
        if (isDeleting) return;
        setIsDeleting(true);
        try {
            await axios.delete(`/api/todos/${task._id}`);
            onDelete(task._id);
        } catch (error) {
            console.error('Error deleting todo', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (updatedTask: TodoModel) => {
        setIsEditing(false);
        onUpdate(updatedTask);
    };

    return (
        <article
            ref={drag}
            style={{ opacity }}
            className='border w-full min-h-[100px] border-[#dcdcdc] rounded-lg p-4 mb-4 bg-gradient-to-r  from-[#283048] to-[#16222A] text-white shadow-lg cursor-grabbing active:opacity-[0.7] active:border-2 active:border-black transition-all'
        >
            {isEditing ? (
                <EditTask task={task} onSave={handleSave} onCancel={() => setIsEditing(false)} />
            ) : (
                <>
                    <p className='text-[20px] font-semibold mb-4'>{task.todo}</p>
                    <div className='flex justify-end gap-2'>
                        <div onClick={handleEdit} className='w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer transition-all bg-gray-600 hover:bg-gray-800 ease-in-out'>
                            <AiFillEdit className='text-white w-5 h-5' />
                        </div>
                        <div onClick={handleDelete} className='w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer transition-all bg-gray-600 hover:bg-gray-800 ease-in-out'>
                            <AiFillDelete className='text-white w-5 h-5' />
                        </div>
                    </div>
                </>
            )}
        </article>
    );
};

export default TaskCard;
