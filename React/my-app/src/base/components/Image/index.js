import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

let observer = null;
const LOAD_IMG_EVENT_TYPE = "loadImage";

const onIntersection = (entries, io) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            io.unobserve(entry.target);
            entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
        }
    });
};

const Image = ({
    lazy,
    threshold = 0.5,
    placeholder,
    src,
    block,
    width,
    height,
    alt,
    mode,
    style,
    ...props
}) => {
    const [loaded, setLoaded] = useState(false); // 이미지 컴포넌트의 이미지가 로드됐는지 체크해주는 상태
    const imgRef = useRef(null);
    const imageStyle = {
        display: block ? "block" : undefined,
        width,
        height,
        objectFit: mode, // cover, fill, contain
    };

    useEffect(() => {
        // img가 load될 때 lazy가 false라면 바로 로딩
        if (!lazy) {
            setLoaded(true);
            return;
        }
        const handleLoadImage = () => setLoaded(true);

        const imgElement = imgRef.current;
        imgElement &&
            imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
        return () => {
            imgElement &&
                imgElement.removeEventListener(
                    LOAD_IMG_EVENT_TYPE,
                    handleLoadImage
                );
        };
    }, [lazy]);

    useEffect(() => {
        if (!lazy) return;
        observer = new IntersectionObserver(onIntersection, { threshold });
        imgRef.current && observer.observe(imgRef.current);
    }, [lazy, threshold]);

    return (
        <img
            ref={imgRef}
            src={loaded ? src : placeholder}
            alt={alt}
            {...props}
            style={{ ...imageStyle, ...style }}
        />
    );
};

Image.propTypes = {
    lazy: PropTypes.bool,
    placeholder: PropTypes.string,
    threshold: PropTypes.number,
    block: PropTypes.bool,
    src: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    alt: PropTypes.string,
    mode: PropTypes.string,
};

export default Image;
