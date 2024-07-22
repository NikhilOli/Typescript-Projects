import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { TodoModel } from '../models/TodoModel';
import axios from 'axios';
import EditTask from './EditTask';

interface TaskCardProps {
    task: TodoModel;
    onDelete: (todoId: string) => void;
    onUpdate: (updatedTask: TodoModel) => void;
    onReorder: (draggedId: string, hoverId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdate, onReorder }) => {
    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task._id, status: task.status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'TASK',
        hover(item: { id: string }, monitor) {
            if (!ref.current) {
                return;
            }
            const draggedId = item.id;
            const hoverId = task._id;

            if (draggedId === hoverId) {
                return;
            }

            onReorder(draggedId, hoverId);
        },
    });

    drag(drop(ref));

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/todos/${task._id}`);
            onDelete(task._id);
        } catch (error) {
            console.error('Error deleting todo', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (updatedTask: TodoModel) => {
        try {
            const response = await axios.put(`/api/todos/${task._id}`, { todo: updatedTask.todo });
            setIsEditing(false);
            onUpdate(response.data);
        } catch (error) {
            console.error('Error updating todo', error);
        }
    };

    return (
        <div
            ref={ref}
            className={`bg-white bg-opacity-30 border border-white rounded-md p-3 md:p-4 shadow-sm transition-all ${isDragging ? 'opacity-50' : ''}`}
        >
            {isEditing ? (
                <EditTask task={task} onSave={handleSave} onCancel={() => setIsEditing(false)} />
            ) : (
                <>
                    <p className="text-sm md:text-base text-white">{task.todo}</p>
                    <div className="flex justify-end mt-2 space-x-2">
                        <button onClick={handleEdit} className="text-yellow-300 hover:text-yellow-400">
                            <AiOutlineEdit className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button onClick={handleDelete} className="text-red-400 hover:text-red-500">
                            <AiOutlineDelete className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskCard;