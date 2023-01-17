import Header from "./Header.js";
import TodoForm from "./Todoform.js";
import TodoList from "./Todolist.js";
import { setItem } from "./Storage.js";

export default function App({$target, initialState}) {

    new Header({$target, text: 'Simple Todo List'})

    new TodoForm({
        $target,
        onSubmit: (text) => {
            const nextState = [...todoList.state, {text}]
            todoList.setState(nextState);
            setItem('todos',JSON.stringify(nextState));
        }
    })
    const todoList = new TodoList({
        $target,
        initialState
    })
}