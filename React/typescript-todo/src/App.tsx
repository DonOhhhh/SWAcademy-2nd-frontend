import styled from "@emotion/styled";
import React from "react";
import Header from "./components/Header";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";

const Container = styled.div`
    width: 400px;
    margin: 0 auto;
`;

const App = () => {
    return (
        <Container>
            <Header>Todo</Header>
            <NewTaskForm />
            <TaskList style={{ marginTop: 16 }} />
        </Container>
    );
};

export default App;
