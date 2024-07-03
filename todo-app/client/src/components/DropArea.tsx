import React, { useState } from 'react';

interface DropAreaProps {
    currentDropTarget: string | null;
    setCurrentDropTarget: (id: string | null) => void;
    id: string;
}

const DropArea: React.FC<DropAreaProps> = ({ currentDropTarget, setCurrentDropTarget, id }) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setCurrentDropTarget(id);
        setIsActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setCurrentDropTarget(null);
        setIsActive(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsActive(false);
        // Handle drop logic here if needed
    };

    return (
        <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border w-full ${isActive ? 'min-h-[100px] border-[#dcdcdc] rounded-lg p-4 m-[15px] opacity-100 active:border-2' : 'h-0 p-0 m-0 border-0 opacity-0'}`}
        >
            {isActive && 'Drop Here'}
        </div>
    );
};

export default DropArea;
