import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

interface DropAreaProps {
    status: string;
    onDrop: (taskId: string, newStatus: string) => void;
}

const DropArea: React.FC<DropAreaProps> = ({ status, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item: { id: string }) => {
            onDrop(item.id, status);
        },
        collect: (monitor: DropTargetMonitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const borderColor = isOver ? '#dcdcdc' : 'transparent';

    return (
        <div
            ref={drop}
            className='border w-full min-h-[100px] border-[#dcdcdc] rounded-lg p-4 m-[15px] opacity-100'
            style={{ borderColor }}
        >
            {isOver && 'Drop Here'}
        </div>
    );
};

export default DropArea;
