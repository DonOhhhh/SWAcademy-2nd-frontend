import useKeyPress from "../../base/hooks/useKeyPress";

export default {
    title: "Hook/useKeyPress",
};

export const Default = () => {
    const pressed = useKeyPress("?");
    return <>{pressed ? "Peek-A-Boo!" : "Press ? Key"}</>;
};
