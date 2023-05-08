import Avatar from "../../base/components/Avatar";
import Toggle from "../../base/components/Toggle";

export default {
    title: "Component/Avatar",
    component: Avatar,
    argTypes: {
        src: { defaultValue: "https://picsum.photos/200" }, // /200/400 높이가 400, 넓이가 200
        shape: {
            defaultValue: "circle",
            control: "inline-radio",
            options: ["circle", "round", "square"],
        },
        size: {
            defaultValue: 70,
            control: { type: "range", min: 40, max: 200 },
        },
        mode: {
            defaultValue: "cover",
            control: "inline-radio",
            options: ["contain", "cover", "fill"],
        },
    },
};

export const Default = (args) => {
    return <Avatar {...args} />;
};

export const Group = (args) => {
    return (
        <Avatar.Group size={40}>
            <Avatar src="https://picsum.photos/200?1" />
            <Avatar src="https://picsum.photos/200?2" />
            <Avatar src="https://picsum.photos/200?3" />
            <Avatar src="https://picsum.photos/200?4" />
            <Toggle />
        </Avatar.Group>
    );
};
