import { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

// 슬라이더 구조
// 1. 핸들 : 잡는 곳
// 2. 레일 : 움직이는 곳
// 3. 트랙 : 이미 채워진 곳

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 16px;
`;

const Rail = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #aaa;
`;

const Handle = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%); // 좌측으로 올라간다.
  border: 2px solid #44b;
  background-color: white;
  border-radius: 100%;
  cursor: grab;
`;

const Track = styled.div`
    position: absolute;
    top: 6px;
    left: 0;
    width: 0;
    height: 4px;
    border-radius: 4px;
    background-color: #44b;
`;

const Slider = ({
    min = 0,
    max = 100,
    step = 0.1,
    defaultValue,
    onChange,
    ...props
}) => {
    const sliderRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [value, setValue] = useState(defaultValue ? defaultValue : min);

    const handleMouseDown = useCallback(() => {
        setDragging(true);
    }, []);

    const handleMouseUp = useCallback(() => {
        setDragging(false);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging) return;

            const handleOffset = e.pageX - sliderRef.current.offsetLeft; // 마우스의 위치
            const sliderWidth = sliderRef.current.offsetWidth; // slider의 넓이

            const track = handleOffset / sliderWidth;
            let newValue;
            if (track < 0) {
                newValue = min;
            } else if (track > 1) {
                newValue = max;
            } else {
                newValue =
                    Math.round((min + (max - min) * track) / step) * step;
                newValue = Math.min(max, Math.max(min, newValue));
            }

            setValue(newValue);
            onChange && onChange(newValue);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [value, min, max, dragging, sliderRef, handleMouseUp, onChange, step]);

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <SliderContainer ref={sliderRef} {...props}>
            <Rail />
            <Track style={{ width: `${percentage}%` }} />
            <Handle
                onMouseDown={handleMouseDown}
                style={{ left: `${percentage}%` }}
            />
        </SliderContainer>
    );
};

export default Slider;
