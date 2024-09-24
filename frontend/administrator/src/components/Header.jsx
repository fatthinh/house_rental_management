import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

// Header
const Header = ({ category, title, path }) => {
    const navigate = useNavigate();

    return (
        <div className="mb-2">
            {/* Category */}
            <p className="text-gray-400">{category}</p>
            {/* Title */}
            <div className="flex justify-between">
                <p className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</p>
                {path && (
                    <Button text="Tạo mới" borderRadius={6} onClick={() => navigate(path)} className="bg-primary-700 text-neutral-100 font-medium px-5" />
                )}
            </div>
        </div>
    );
};

export default Header;
