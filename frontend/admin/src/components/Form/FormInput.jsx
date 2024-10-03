import { useState } from 'react';
import Button from '@/components/Button';

const FormInput = ({ name, type = 'text', label, value, setValue, onFocus = () => {}, readOnly, values }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    const handleOptionClick = (item) => {
        setValue(item);
        setIsFocused(false);
    };

    return (
        <>
            <div className="relative">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type={type}
                        name={name}
                        id={name}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        readOnly={values || readOnly ? true : false}
                        onMouseDown={() => {
                            setIsFocused(true);
                            onFocus();
                        }}
                        onFocus={() => {
                            setIsFocused(true);
                            onFocus();
                        }}
                        onBlur={() => setIsFocused(false)}
                    />
                    <label
                        htmlFor={name}
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {label}
                    </label>
                </div>
                {values && isFocused && !readOnly && (
                    <div className="absolute z-10 bg-white top-[44px] rounded-md shadow-md w-[20%]">
                        <ul>
                            {values.map((item, index) => (
                                <li key={index}>
                                    <button
                                        className="p-2 text-left hover:bg-primary-100 w-full rounded-md"
                                        onMouseDown={handleMouseDown}
                                        onMouseUp={() => handleOptionClick(item)}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};
export default FormInput;
