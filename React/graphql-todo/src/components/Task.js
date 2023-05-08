import { gql, useApolloClient, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { Toggle } from "./Toggle";

const Li = styled.li`
    display: flex;
    width: 400px;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    list-style: none;
    box-sizing: border-box;
`;

const Content = styled.span`
    flex: 1;
    margin-left: 8px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;
    text-decoration: ${({ complete }) => (complete ? "line-through" : "none")};
`;

const RemoveBtn = styled.button`
    width: 60px;
    height: 24px;
    margin-left: 8px;
    color: white;
    border-radius: 8px;
    border: none;
    background-color: lightcoral;
    cursor: pointer;
    &:hover {
        background-color: red;
    }
`;

const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
            data {
                id
            }
        }
    }
`;

const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $complete: Boolean!) {
        updateTask(id: $id, data: { complete: $complete }) {
            data {
                id
            }
        }
    }
`;

export const Task = ({ id, content, complete }) => {
    const client = useApolloClient();
    const [deleteTask] = useMutation(DELETE_TASK);
    const [updateTask] = useMutation(UPDATE_TASK);

    const handleRemove = useCallback(() => {
        deleteTask({ variables: { id } });
        client.refetchQueries({ include: ["GetTasks"] });
    }, [id, deleteTask, client]);

    const handleChange = useCallback(
        (e) => {
            updateTask({ variables: { id, complete: e.target.checked } });
            client.refetchQueries({ include: ["GetTasks"] });
        },
        [updateTask, id, client]
    );

    return (
        <Li id={id}>
            <Toggle on={complete} onChange={handleChange} />
            <Content complete={complete}>{content}</Content>
            <RemoveBtn onClick={handleRemove}>Remove</RemoveBtn>
        </Li>
    );
};
