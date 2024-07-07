import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { TodoModel } from '../models/TodoModel';

interface DropAreaProps {
    currentDropTarget: string | null;
    setCurrentDropTarget: (id: string | null) => void;
    id: string;
    status: string;
    onDrop: (taskId: string, newStatus: string) => void;
}

const DropArea: React.FC<DropAreaProps> = ({ currentDropTarget, setCurrentDropTarget, id, status, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item: { id: string, status: string }) => {
            onDrop(item.id, status);
        },
        collect: (monitor: DropTargetMonitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const isActive = isOver && currentDropTarget === id;
    const borderColor = isActive ? '#dcdcdc' : 'transparent';

    return (
        <div
            ref={drop}
            className={`border w-full min-h-[100px] border-[#dcdcdc] rounded-lg p-4 m-[15px] opacity-100 ${isActive ? 'active:border-2' : 'h-0 p-0 m-0 border-0 opacity-0'}`}
            style={{ borderColor }}
            onDragEnter={() => setCurrentDropTarget(id)}
            onDragLeave={() => setCurrentDropTarget(null)}
        >
            {isActive && 'Drop Here'}
        </div>
    );
};

export default DropArea;
