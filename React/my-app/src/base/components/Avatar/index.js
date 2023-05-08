import ImageComponent from "../Image";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import AvatarGroup from "./AvatarGroup";

const ShapeToCssValue = {
    circle: "50%",
    round: "4px",
    square: "0px",
};

const AvatarWrapper = styled.div`
    position: relative;
    display: inline-block;
    border: 1px solid #dadada;
    border-radius: ${({ shape }) => ShapeToCssValue[shape]};
    background-color: #eee;
    overflow: hidden;

    > img {
        transition: opacity 0.2s ease-out;
    }
`;

const Avatar = ({
    lazy,
    threshold,
    src,
    size = 70,
    shape = "circle",
    placeholder,
    alt,
    mode = "dover",
    ...props
}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const image = new Image(); // Image는 브라우저에 내장된 object
        image.src = src;
        image.onload = () => setLoaded(true);
    }, [src]);

    return (
        <AvatarWrapper {...props} shape={shape}>
            <ImageComponent
                block
                lazy={lazy}
                threshold={threshold}
                width={size}
                height={size}
                src={src}
                placeholder={placeholder}
                alt={alt}
                mode={mode}
                style={{ opacity: loaded ? 1 : 0 }}
            />
        </AvatarWrapper>
    );
};

// props로 넘겨주면 인식하지 않는다. 따라서 defaultProps를 사용하여 타입을 설정해준다.
Avatar.defaultProps = {
    __TYPE: "Avatar",
};

// 사용자가 강제로 type을 바꾸는 것을 막는다.
Avatar.propTypes = {
    __TYPE: "Avatar",
};

Avatar.Group = AvatarGroup;

export default Avatar;
