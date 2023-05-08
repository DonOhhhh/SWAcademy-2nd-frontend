import Divider from "../../base/components/Divider";
import Text from "../../base/components/Text";

export default {
    title: "Component/Divider",
    component: Divider,
};

export const Horizontal = () => {
    return (
        <>
            <Text>상</Text>
            <Divider type="horizontal" />
            <Text>하</Text>
        </>
    );
};

export const Vertical = () => {
    return (
        <>
            <Text>좌</Text>
            <Divider type="vertical" />
            <Text>우</Text>
        </>
    );
};
