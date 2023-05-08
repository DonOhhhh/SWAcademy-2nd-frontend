import styled from "@emotion/styled";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../redux";
import Task from "./Task";

const TaskList = (props: any) => {
    const tasks = useSelector((store: RootState) => store.tasks);

    return (
        <UnorderedList {...props}>
            {tasks.map(({ id, content, complete }) => (
                <Task key={id} id={id} content={content} complete={complete} />
            ))}
        </UnorderedList>
    );
};

export default TaskList;

const UnorderedList = styled.ul`
    width: 400px;
    margin: 0;
    padding: 0;

    & > li {
        &:not(:first-of-type) {
            margin-top: 8px;
        }
    }
`;
