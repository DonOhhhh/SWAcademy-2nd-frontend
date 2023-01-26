import { useCallback, useEffect } from 'react';
import { useState, useRef } from 'react'

const useHover = (initialState = false) => {
    const [state, setState] = useState(false);
    const ref = useRef(null);

    const handleMouseOver = useCallback(() => setState(true), []);
    const handleMouseOut = useCallback(() => setState(false), []);

    useEffect(() => {
        const element = ref.current;
        if (element) {
            element.addEventListener('mouseover', handleMouseOver);
            element.addEventListener('mouseout', handleMouseOut);
            return () => {
                element.removeEventListener('mouseover', handleMouseOver)
                element.removeEventListener('mouseout', handleMouseOut)
            }
        }
    }, [ref, handleMouseOut, handleMouseOver])

    return [ref, state];
}

export default useHover;