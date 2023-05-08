import React from "react";

const AvatarGroup = ({ children, shape = "circle", size = 70, ...props }) => {
    const avatars = React.Children.toArray(children)
        .filter((element) => {
            // 자식노드들 중 Avatar만 걸러준다.
            return React.isValidElement(element) &&
                element.props.__TYPE === "Avatar";


        })
        .map((avatar, index, avatars) => {
            return React.cloneElement(avatar, {
                ...avatar.props,
                size,
                shape,
                style: {
                    ...avatar.props.style,
                    marginLeft: -size / 5,
                    zIndex: avatars.length - index,
                },
            });
        });

    return <div style={{ paddingLeft: size / 5 }}>{avatars}</div>;
};

export default AvatarGroup;
