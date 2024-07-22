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

    const borderColor = isOver ? 'border-yellow-300' : 'border-white border-opacity-50';

    return (
        <div
            ref={drop}
            className={`border w-full min-h-[100px] rounded-lg p-4 m-[15px] ${borderColor} bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg`}
        >
            {isOver && <p className="text-white text-center">Drop Here</p>}
        </div>
    );
};

export default DropArea;