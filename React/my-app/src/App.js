import { Outlet } from "react-router-dom";
import DefaultTemplate from "./domain/template/DefaultTemplate";

export default function App() {
    return (
        <>
            <DefaultTemplate />
            <Outlet />
        </>
    );
}
