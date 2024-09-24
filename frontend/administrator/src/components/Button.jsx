import React from 'react';
import Spinner from '@/components/Spinner';
import { useState } from 'react';

// Button
const Button = ({
    primary,
    secondary,
    outline,
    icon,
    color,
    text,
    onClick = () => {},
    className,
    type = 'button',
    loading,
}) => {
    const [loadingVisible, setLoadingVisible] = useState(false);

    const onClickBtn = () => {
        if (loading) {
            setLoadingVisible(true);
            setTimeout(() => {
                setLoadingVisible(false);
                onClick();
            }, 1000);
        } else {
            onClick();
        }
    };

    const primaryStyle = 'bg-primary-500 text-white';
    const secondaryStyle = 'bg-accent-500 text-white';
    const outlineStyle = 'border-2 border-neutral-500 text-neutral-800';

    return (
        <button
            type={type}
            onClick={onClickBtn}
            style={{ color }}
            className={`px-4 py-2 rounded-md transition ease-in-out hover:-translate-y-0.5 duration-150 text-black font-medium
            ${primary && primaryStyle} 
            ${secondary && secondaryStyle} 
            ${outline && outlineStyle} 
            ${className}`}
        >
            {loadingVisible ? (
                <div className="flex gap-2">
                    <Spinner size={24} /> Đang xử lý...
                </div>
            ) : (
                <>
                    {icon} {text}
                </>
            )}
        </button>
    );
};

export default Button;
