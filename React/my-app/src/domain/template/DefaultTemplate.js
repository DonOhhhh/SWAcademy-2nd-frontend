import Menu from "../components/Menu";

// 어떤 페이지를 가도 항상 보여지는 template
const DefaultTemplate = ({ children }) => {
    return (
        <div>
            <Menu />
            <main>{children}</main>
        </div>
    );
};

export default DefaultTemplate;
