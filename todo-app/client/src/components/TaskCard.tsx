import React from 'react';
import { useDrag } from 'react-dnd';
import deleteIcon from '../assets/delete.png';
import Button from './Button';
import { TodoModel } from '../models/TodoModel';

interface TaskCardProps {
    task: TodoModel;
    setActiveCard: (id: string | null) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, setActiveCard }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task._id, status: task.status },
        end: (item, monitor) => {
            setActiveCard(null);
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.5 : 1;

    return (
        <article
            ref={drag}
            style={{ opacity }}
            className='border w-full min-h-[100px] border-[#dcdcdc] rounded-lg p-4 m-[15px] bg-gray-700 text-white cursor-grabbing active:opacity-[0.7] active:border-2 active:border-black'
        >
            <p className='text-[20px] font-semibold mb-4'>{task.todo}</p>
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
