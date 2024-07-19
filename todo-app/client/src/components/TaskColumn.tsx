import React from 'react';
import TaskCard from './TaskCard';
import { TodoModel } from '../models/TodoModel';
import { useDrop } from 'react-dnd';

interface TaskColumnProps {
    heading: string;
    icon: string;
    tasks: TodoModel[];
    onDrop: (taskId: string, newStatus: string) => void;
    onDelete: (taskId: string) => void; 
    onUpdate: (updatedTask: TodoModel) => void; 
    onReorder: (draggedId: string, hoverId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ heading, icon, tasks, onDrop, onDelete, onUpdate, onReorder }) => {
    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item: { id: string }) => {
            onDrop(item.id, heading.toLowerCase());
        },
    });

    return (
        <section ref={drop} className=" bg-gray-200 h-full p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center text-gray-800">
                <img src={icon} alt={heading} className="w-6 h-6 mr-2" />
                {heading}
            </h2>
            <div className="space-y-3 md:space-y-4">
                {tasks.map((task) => (
                    <TaskCard 
                        key={task._id} 
                        task={task} 
                        onDelete={onDelete} 
                        onUpdate={onUpdate}
                        onReorder={onReorder}
                    />
                ))}
            </div>
        </section>
    );
};

export default TaskColumn;