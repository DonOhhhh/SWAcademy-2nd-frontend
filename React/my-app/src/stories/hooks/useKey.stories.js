import useKey from "../../base/hooks/useKey";

export default {
    title: "Hook/useKey",
};

export const Default = () => {
    useKey("keydown", "f", () => {
        alert("f key down");
    });

    useKey("keyup", "q", () => {
        alert("q key up");
    });

    return <div>useKey</div>;
};
