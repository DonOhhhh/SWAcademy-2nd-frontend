import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Task } from "./Task";

const Ul = styled.ul`
    width: 400px;
    margin: 16px 0;
    padding: 0;

    & > li {
        &:not(:first-of-type) {
            margin-top: 8px;
        }
    }
`;

const GET_TASK = gql`
    query GetTasks {
        tasks {
            data {
                id
                attributes {
                    content
                    complete
                }
            }
        }
    }
`;

export const TaskList = () => {
    const { data, loading, error } = useQuery(GET_TASK);
    if (loading) return "loading...";
    if (error) return "Error!";
    return (
        <Ul>
            {data.tasks.data.map((task) => (
                <Task
                    key={task.id}
                    id={task.id}
                    content={task.attributes.content}
                    complete={task.attributes.complete}
                />
            ))}
        </Ul>
    );
};
