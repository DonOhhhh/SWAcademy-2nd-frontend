import { useEffect, useRef } from "react";
import useRafState from "./useRafState";

const useScroll = () => {
    const [state, setState] = useRafState({ x: 0, y: 0 });
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // scroll event가 발생하면 리렌더링하게 된다.
        const handleScroll = () => {
            setState({
                x: ref.current.scrollLeft,
                y: ref.current.scrollTop,
            });
        };

        element.addEventListener("scroll", handleScroll, { passive: true }); // preventDefault를 체크하지 않는다.

        return () => {
            element.removeEventListener("scroll", handleScroll);
        };
    }, [ref, setState]);

    return [ref, state];
};

export default useScroll;
