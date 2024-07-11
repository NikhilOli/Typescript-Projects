import React from 'react';
import TaskCard from './TaskCard';
import DropArea from './DropArea';
import { TodoModel } from '../models/TodoModel';

interface TaskColumnProps {
    heading: string;
    icon: string;
    tasks: TodoModel[];
    onDrop: (taskId: string, newStatus: string) => void;
    onDelete: (taskId: string) => void; 
    onUpdate: (updatedTask: TodoModel) => void; 

}

const TaskColumn: React.FC<TaskColumnProps> = ({ heading, icon, tasks, onDrop, onDelete, onUpdate }) => {
    return (
        <section className='w-1/3 mx-4'>
            <h2 className='flex items-center gap-2 font-bold text-white mb-[15px]'>
                <img className='w-[30px]' src={icon} alt="Icon" />
                {heading}
            </h2>
            {tasks.map((task) => (
                <React.Fragment key={task._id}>
                    <TaskCard task={task} onDelete={onDelete} onUpdate={onUpdate} />
                </React.Fragment>
            ))}
            <DropArea onDrop={onDrop} status={heading.toLowerCase()} />
        </section>

    );
};

export default TaskColumn;
