import React from 'react';

interface DropAreaProps {
    currentDropTarget: string | null;
    setCurrentDropTarget: (id: string | null) => void;
    id: string;
    updateTodoStatus: (id: string, status: string) => void;
    status: string;
}

const DropArea: React.FC<DropAreaProps> = ({ currentDropTarget, setCurrentDropTarget, id, updateTodoStatus, status }) => {
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setCurrentDropTarget(id);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setCurrentDropTarget(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        updateTodoStatus(taskId, status);
        setCurrentDropTarget(null);
    };

    return (
        <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border w-full ${currentDropTarget === id ? 'min-h-[100px] border-[#dcdcdc] rounded-lg p-4 m-[15px] opacity-100 active:border-2' : 'h-0 p-0 m-0 border-0 opacity-0'}`}
        >
            {currentDropTarget === id && 'Drop Here'}
        </div>
    );
};

export default DropArea;
    