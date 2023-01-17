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
        todos: []
    }

    const header = new Header({
        $target,
        initialState: this.state.username
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
            await request(`${this.state.username}`,{
                method: 'POST',
                body: JSON.stringify(todos)
            })
            await init()
        }
    })
    this.setState = nextState => {
        this.state = nextState
        todoList.setState(this.state.todos)
    }
    const todoList = new TodoList({
        $target,
        initialState: this.state.todos,
        onToggle: (id) => {
            alert(`${id} : 토글 예정`)
        },
        onRemove: (id) => {
            alert(`${id} : 삭제 예정`)
        }
    })

    const fetchTodo = async() => {
        const {username} = this.state
        if(this.state.username) {
            const todos = await request(`${username}?delay=5000`)
            this.setState({
                ...this.state,
                todos
            })
        }
    }

    fetchTodo();
}