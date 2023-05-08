import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import styled from "@emotion/styled";
import { Header } from "./components/Header";
import { NewTaskForm } from "./components/NewTaskForm";
import { TaskList } from "./components/TaskList";

const Container = styled.div`
    width: 400px;
    margin: 0 auto;
`;

const httpLink = createHttpLink({
    uri: "http://localhost:1337/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token =
        "d378da3082e07c3074583ae24f247bd59ecbab9ae737703b651ccf952befc4a0c7d0f5318ea8270050e64bd22b4d548f007cc390da771ca0402a0940f08a45203358001f610f236b676db0ad9af9bc792d0873aedf3e9e539d6d21ba93ca2a0a0b835610e209084c45d92ab71edc16bff0ed0ba0a38389c3cf8eb1ffb0745d31";
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <Container>
                <Header>To do</Header>
                <NewTaskForm />
                <TaskList />
            </Container>
        </ApolloProvider>
    );
}
