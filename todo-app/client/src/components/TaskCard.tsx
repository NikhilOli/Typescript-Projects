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

    const handleSave = (updatedTask: TodoModel) => {
        setIsEditing(false);
        onUpdate(updatedTask);
    };

    return (
        <div
            ref={ref}
            className={`bg-gray-900 border border-gray-200 rounded-md p-3 md:p-4 shadow-sm transition-all ${isDragging ? 'opacity-50' : ''}`}
        >
            {isEditing ? (
                <EditTask task={task} onSave={handleSave} onCancel={() => setIsEditing(false)} />
            ) : (
                <>
                    <p className="text-sm md:text-base text-gray-100">{task.todo}</p>
                    <div className="flex justify-end mt-2 space-x-2">
                        <button onClick={handleEdit} className="text-blue-600 hover:text-blue-700">
                            <AiOutlineEdit className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button onClick={handleDelete} className="text-red-600 hover:text-red-700">
                            <AiOutlineDelete className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskCard;