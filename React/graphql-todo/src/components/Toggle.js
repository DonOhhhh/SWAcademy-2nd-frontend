import styled from "@emotion/styled";
import { useToggle } from "../hooks/useToggle";

const ToggleContainer = styled.label`
    display: inline-block;
    cursor: pointer;
    user-select: none;
`;

const ToggleSwitch = styled.div`
    width: 64px;
    height: 30px;
    padding: 2px;
    border-radius: 15px;
    background-color: #ccc;
    transition: background-color 0.2s ease-out;
    box-sizing: border-box;

    &:after {
        content: "";
        position: relative;
        left: 0;
        display: block;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background-color: white;
        transition: left 0.2s ease-out;
    }
`;

const ToggleInput = styled.input`
    display: none;

    &:checked + div {
        background: lightgreen;
    }

    &:checked + div:after {
        left: calc(100% - 26px);
    }

    &:disabled + div {
        opacity: 0.7;
        cursor: not-allowed;

        &:after {
            opacity: 0.7;
        }
    }
`;

export const Toggle = ({ on = false, onChange, ...props }) => {
    const [checked, toggle] = useToggle(on);

    const handleChange = (e) => {
        toggle();
        onChange && onChange(e);
    };

    return (
        <ToggleContainer {...props}>
            <ToggleInput
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                style={{ display: "none" }}
            />
            <ToggleSwitch />
        </ToggleContainer>
    );
};
