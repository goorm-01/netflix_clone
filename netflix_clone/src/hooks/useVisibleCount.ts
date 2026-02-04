import { useState, useEffect } from 'react';

export function useVisibleCount() {
    const getCount = () => {
        const width = window.innerWidth;
        if (width >= 1400) return 6;
        if (width >= 1100) return 5;
        if (width >= 800) return 4;
        if (width >= 500) return 3;
        return 2;
    };

    const [visibleCount, setVisibleCount] = useState(getCount);

    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(getCount());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return visibleCount;
}