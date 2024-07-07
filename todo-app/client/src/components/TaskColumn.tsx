import React from 'react';
import TaskCard from './TaskCard';
import DropArea from './DropArea';
import { TodoModel } from '../models/TodoModel';

interface TaskColumnProps {
    heading: string;
    icon: string;
    tasks: TodoModel[];
    setActiveCard: (id: string | null) => void;
    currentDropTarget: string | null;
    setCurrentDropTarget: (id: string | null) => void;
    onDrop: (taskId: string, newStatus: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ heading, icon, tasks, setActiveCard, currentDropTarget, setCurrentDropTarget, onDrop }) => {
    return (
        <section className='w-1/3 mx-4'>
            <h2 className='flex items-center gap-2 font-bold text-white mb-[15px]'>
                <img className='w-[30px]' src={icon} alt="Icon" />
                {heading}
            </h2>
            {tasks.map((task) => (
                <React.Fragment key={task._id}>
                    <TaskCard task={task} setActiveCard={setActiveCard} />
                </React.Fragment>
            ))}
            <DropArea currentDropTarget={currentDropTarget} setCurrentDropTarget={setCurrentDropTarget} id={`${heading}-bottom`} onDrop={onDrop} status={heading.toLowerCase()} />
        </section>
    );
};

export default TaskColumn;
