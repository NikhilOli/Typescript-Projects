import React from 'react';
import TaskCard from './TaskCard';
import DropArea from './DropArea';

interface TaskColumnProps {
    heading: string;
    icon: string;
    tasks: { _id: string, todo?: string }[];
    setActiveCard: (id: string | null) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ heading, icon, tasks, setActiveCard }) => {
    return (
        <section className='w-1/3 mx-4'>
            <h2 className='flex items-center gap-2 font-bold text-white mb-[15px]'>
                <img className='w-[30px]' src={icon} alt="Icon" />
                {heading}
            </h2>
            <DropArea />
            {tasks.map((task) => (
                <React.Fragment key={task._id}>
                <TaskCard key={task._id} task={task} setActiveCard={setActiveCard} />
                <DropArea />
                </React.Fragment>
            ))}
        </section>
    );
};

export default TaskColumn;
