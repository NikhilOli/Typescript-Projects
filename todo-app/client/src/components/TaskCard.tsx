import React from 'react';
import deleteIcon from '../assets/delete.png';
import Button from './Button';

interface TaskCardProps {
    task: { _id: string, todo?: string };
    setActiveCard: (id: string | null) => void;

}

const TaskCard: React.FC<TaskCardProps> = ({ task, setActiveCard }) => {
    return (
        <article className='border w-full min-h-[100px] border-[#dcdcdc] rounded-lg p-4 m-[15px] bg-gray-700 text-white cursor-grabbing active:opacity-[0.7] active:border-2 active:border-black' draggable onDragStart={() => setActiveCard(task._id)} onDragEnd={() => setActiveCard(null)}>
            <p className='text-[20px] font-semibold mb-4'>{task.todo || "No Task"}</p>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2'>
                    <Button title='HTML' onClick={() => {}} />
                    <Button title='CSS' onClick={() => {}} />
                </div>
                <div className='w-[35px] h-[35px] rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-gray-600 ease-in-out'>
                    <img className='w-5 opacity-50 duration-200 ease-in-out hover:opacity-80' src={deleteIcon} alt="Delete" />
                </div>
            </div>
        </article>
    );
};

export default TaskCard;
