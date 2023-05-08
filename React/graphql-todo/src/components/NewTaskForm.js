import { gql, useApolloClient, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useCallback, useState } from "react";

const Form = styled.form`
    width: 400px;
`;

const Input = styled.input`
    width: 332px;
    height: 32px;
    padding: 4px 6px;
    border-radius: 10px;
    border: 3px solid black;
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
`;

const SubmitButton = styled.button`
    width: 60px;
    height: 32px;
    padding: 4px 6px;
    margin-left: 8px;
    color: white;
    border-radius: 8px;
    border: none;
    background-color: black;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
        background-color: #aaa;
    }
`;

const CREATE_TASK = gql`
    mutation CreateTask($content: String!) {
        createTask(data: { content: $content, complete: false }) {
            data {
                id
            }
        }
    }
`;

export const NewTaskForm = () => {
    const client = useApolloClient();
    const [task, setTask] = useState("");
    const [createTask] = useMutation(CREATE_TASK);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setTask("");
            createTask({ variables: { content: task } });
            client.refetchQueries({ include: ["GetTasks"] });
        },
        [createTask, task, client]
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Add a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <SubmitButton>Add</SubmitButton>
        </Form>
    );
};
