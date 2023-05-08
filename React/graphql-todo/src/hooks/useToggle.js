import { useCallback, useState } from "react";

export const useToggle = (initialState) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState(!state), [state, setState]);
    return [state, toggle];
};
