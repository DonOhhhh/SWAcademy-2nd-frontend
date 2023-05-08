import React from "react";

const Checkbox = React.memo(({ label = "Label", on: checked, onChange }) => {
    return (
        <label>
            {label}
            <input
                type="checkbox"
                defaultChecked={checked}
                onChange={onChange}
            />
        </label>
    );
});

export default Checkbox;
