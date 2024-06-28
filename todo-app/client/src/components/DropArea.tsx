import React, { useState } from "react";

const DropArea: React.FC = () => {
    const [showDrop, setShowDrop] = useState<boolean>(false);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowDrop(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowDrop(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <section
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        className={`border w-full min-h-[100px] border-[#dcdcdc] rounded-lg p-4 m-[15px] text-white transition-all duration-200 ease-in-out ${
            showDrop ? "opacity-100 active:border-2" : "opacity-0"
        }`}
        >
        Drop Here
        </section>
    );
};

export default DropArea;
