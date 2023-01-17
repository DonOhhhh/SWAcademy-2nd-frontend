import { request } from "./API.js"
import Header from "./Header.js"
import TodoForm from "./TodoForm.js"
import TodoList from "./TodoList.js"

export default function App({ $target }) {

    const DUMMY_DATA = [
        {
            _id: 1,
            content: 'JavaScript 학습하기',
            isCompleted: true
        },
        {
            _id: 2,
            content: 'JavaScript 복습하기',
            isCompleted: false
        }
    ]

    this.state = {
        username: 'roto',
        todos: [],
        isTodoLoading: false
    }

    const header = new Header({
        $target,
        initialState: {
            isTodoLoading: this.state.isTodoLoading,
            username: this.state.username
        }
    })

    const todoForm = new TodoForm({
        $target,
        onSubmit: async (content) => {
            const todos = {
                content,
                isCompleted: false
            }
            // 낙관적 업데이트(api가 성공할 걸로 예상하고 client에 먼저 업데이트하고 api를 보내는 방법)
            this.setState({
                ...this.state,
                todos: [
                    ...this.state.todos,
                    todos
                ]
            })
            await request(`${this.state.username}?delay=3000`,{
                method: 'POST',
                body: JSON.stringify(todos)
            })
            await fetchTodo()
        }
    })
    this.setState = nextState => {
        this.state = nextState
        header.setState({
            isTodoLoading: this.state.isTodoLoading,
            username: this.state.username
        })
        todoList.setState({
            isTodoLoading: this.state.isTodoLoading,
            todos: this.state.todos
        })
    }
    const todoList = new TodoList({
        $target,
        initialState: {
            isTodoLoading: this.state.isTodoLoading,
            todos: this.state.todos
        },
        onToggle: async (id) => {
            const todoIndex = this.state.todos.findIndex(todo=>todo._id === id);
            const nextTodos = [...this.state.todos]
            nextTodos[todoIndex].isCompleted = !nextTodos[todoIndex].isCompleted
            this.setState({
                ...this.state,
                todos: nextTodos
            })
            await request(`${this.state.username}/${id}/toggle?delay=3000`, {
                method: 'PUT'
            })
            await fetchTodo()
        },
        onRemove: async (id) => {
            const todoIndex = this.state.todos.findIndex(todo=>todo._id === id);
            const nextTodos = [...this.state.todos]
            nextTodos.splice(todoIndex,1)
            this.setState({
                ...this.state,
                todos: nextTodos
            })
            await request(`${this.state.username}/${id}?delay=3000`,{
                method: 'DELETE'
            })
            await fetchTodo()
        }
    })

    const fetchTodo = async() => {
        const {username} = this.state
        if(username) {
            this.setState({
                ...this.state,
                isTodoLoading: true
            })
        }
        if(this.state.username) {
            const todos = await request(`${username}?delay=1000`)
            this.setState({
                ...this.state,
                todos,
                isTodoLoading: false
            })
        }
    }

    fetchTodo();
}