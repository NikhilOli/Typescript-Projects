import React from 'react';
import deleteIcon from '../assets/delete.png';
import Button from './Button';

interface TaskCardProps {
    task: string;
    // status: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    return (
        <article className='border w-full min-h-[100px] border-[#dcdcdc] rounded-lg p-4 my-4 bg-gray-700 text-white'>
            <p className='text-[20px] font-semibold mb-4'>{task}</p>
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
