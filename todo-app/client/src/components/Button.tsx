import React from 'react';

interface ButtonProps {
    title: string;
    onClick: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, className }) => {
    return (
        <button
            className={`p-2 rounded-md transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 ${className}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default Button;