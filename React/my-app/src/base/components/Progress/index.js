import styled from "@emotion/styled";

// 슬라이더 구조
// 1. 핸들 : 잡는 곳
// 2. 레일 : 움직이는 곳
// 3. 트랙 : 이미 채워진 곳

const ProgressContainer = styled.div`
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

const Track = styled.div`
    position: absolute;
    top: 6px;
    left: 0;
    width: 0;
    height: 4px;
    border-radius: 4px;
    background-size: 20px 20px;
    background-color: #44b;
    background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent 100%
    );
    animation: move 1000ms linear infinite;
    transition: width 1000ms linear;

    @keyframes move {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 40px 0;
        }
    }
`;

const Progress = ({ value, ...props }) => {
    return (
        <ProgressContainer {...props}>
            <Rail />
            <Track style={{ width: `${value}%` }} />
        </ProgressContainer>
    );
};

export default Progress;
