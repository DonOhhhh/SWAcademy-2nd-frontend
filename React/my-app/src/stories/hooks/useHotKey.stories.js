import { useState } from "react";
import useHotKey from "../../base/hooks/useHotKey";

export default {
    title: "Hook/useHotKey",
};

export const Default = () => {
    const [value, setValue] = useState("");
    const hotkeys = [
        {
            global: true,
            combo: "meta+k",
            onKeyDown: () => {
                alert("meta+k");
            },
        },
        {
            combo: "esc",
            onKeyDown: () => {
                setValue("");
            },
        },
    ];

    const { handleKeyDown } = useHotKey(hotkeys);

    return (
        <div>
            <div>useHotKey 테스트</div>
            <input
                onKeyDown={handleKeyDown}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};
