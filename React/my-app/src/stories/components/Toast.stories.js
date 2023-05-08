import Toast from "../../base/components/Toast";

export default {
    title: "Component/Toast",
};

export const Default = () => {
    return (
        <button onClick={() => Toast.show("안녕하세요", 3000)}>
            Show Toast
        </button>
    );
};
