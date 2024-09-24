import { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const [size, setSize] = useState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight });
    useEffect(() => {
        const handleResize = () => {
            setSize({ screenWidth: window.innerWidth, screenHeight: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        // Clean up!
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return size;
};