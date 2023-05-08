import React, { useEffect } from "react";

const Input = React.forwardRef((props, ref) => {
    useEffect(() => {
        console.log(ref.current);
    }, [ref]);

    return (
        <>
            Input : <input ref={ref} />
        </>
    );
});

export default Input;
