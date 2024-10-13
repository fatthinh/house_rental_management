import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ className, dropdownItems = [], setCurrentItem, label }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [current, setCurrent] = useState(dropdownItems[0]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (item) => {
        setCurrent(item);
        toggleDropdown();
        setCurrentItem(item);
    };

    return (
        <div className={`relative ${className}`}>
            <button
                className="border-1 hover:border-neutral-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-3"
                onClick={toggleDropdown}
            >
                {label} {current}
                <FaChevronDown />
            </button>
            <ul className={`absolute ${isOpen ? 'block' : 'hidden'} bg-white text-gray-800 pt-1 w-full shadow-xl`}>
                {dropdownItems.map((item, index) => (
                    <li key={index} className="hover:bg-gray-200 py-2 px-4" onClick={() => handleClick(item)}>
                        {label} {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;
