import React from 'react';

interface ButtonProps {
    title: string;
    onClick: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, className }) => {
    return (
        <button
            className={`p-2 rounded-lg transition-all hover:opacity-80 ${className}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default Button;
