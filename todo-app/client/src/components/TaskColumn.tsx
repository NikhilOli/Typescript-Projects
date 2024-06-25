import React from 'react';
import TaskCard from './TaskCard';

interface TaskColumnProps {
    heading: string;
    icon: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ heading, icon }) => {
    return (
        <section className='w-1/3 mx-4 bg-gray-800 text-white'>
            <h2 className='flex items-center gap-2 font-bold'>
                <img className='w-[30px]' src={icon} alt="Icon" />
                {heading}
            </h2>
            <TaskCard />
        </section>
    );
};

export default TaskColumn;
