import { request } from "./API.js"
import UserList from "./UserList.js"
import Header from "./Header.js"
import TodoForm from "./TodoForm.js"
import TodoList from "./TodoList.js"

export default function App({ $target }) {

    const $userListContainer = document.createElement('div')
    const $todoListContainer = document.createElement('div')

    $target.appendChild($userListContainer)
    $target.appendChild($todoListContainer)

    this.state = {
        userList: [],
        selectedUsername: null,
        todos: [],
        isTodoLoading: false
    }

    this.setState = nextState => {
        this.state = nextState
        header.setState({
            isTodoLoading: this.state.isTodoLoading,
            selectedUsername: this.state.selectedUsername
        })
        todoList.setState({
            isTodoLoading: this.state.isTodoLoading,
            todos: this.state.todos,
        })
        userList.setState(this.state.userList)
        this.render();
    }

    this.render = () => {
        const {selectedUsername} = this.state;
        $todoListContainer.style.display = selectedUsername ? 'block' : 'none'
    }

    const header = new Header({
        $target : $todoListContainer,
        initialState: {
            isTodoLoading: this.state.isTodoLoading,
            selectedUsername: this.state.selectedUsername
        }
    })

    const userList = new UserList({
        $target : $userListContainer,
        initialState: this.state.userList,
        onSelect: async (username) => {
            this.setState({
                ...this.state,
                selectedUsername: username
            })
            await fetchTodo();
        },
        onRemove: async (username) => {
            const userIndex = this.state.userList.findIndex(name => name === username)
            const nextUserList = [...this.state.userList]
            nextUserList.splice(userIndex, 1)
            this.setState({
                ...this.state,
                userList: nextUserList
            })
            await request(`${username}`, {
                method: 'DELETE'
            })
            await fetchUserList()
        }
    })

    const todoForm = new TodoForm({
        $target : $todoListContainer,
        onSubmit: async (content) => {
            const isFirstTodoAdd = this.state.todos.length === 0

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
            await request(`${this.state.selectedUsername}`, {
                method: 'POST',
                body: JSON.stringify(todos)
            })
            await fetchTodo()
            if(isFirstTodoAdd) {
                await fetchUserList();
            }
        }
    })

    const todoList = new TodoList({
        $target: $todoListContainer,
        initialState: {
            isTodoLoading: this.state.isTodoLoading,
            todos: this.state.todos,
        },
        onToggle: async (id) => {
            const todoIndex = this.state.todos.findIndex(todo => todo._id === id);
            const nextTodos = [...this.state.todos]
            nextTodos[todoIndex].isCompleted = !nextTodos[todoIndex].isCompleted
            this.setState({
                ...this.state,
                todos: nextTodos
            })
            await request(`${this.state.selectedUsername}/${id}/toggle`, {
                method: 'PUT'
            })
            await fetchTodo()
        },
        onRemove: async (id) => {
            const todoIndex = this.state.todos.findIndex(todo => todo._id === id);
            const nextTodos = [...this.state.todos]
            nextTodos.splice(todoIndex, 1)
            this.setState({
                ...this.state,
                todos: nextTodos
            })
            await request(`${this.state.selectedUsername}/${id}`, {
                method: 'DELETE'
            })
            await fetchTodo()
        }
    })

    const fetchUserList = async () => {
        const userList = await request('users')
        this.setState({
            ...this.state,
            userList
        })
    }

    const fetchTodo = async () => {
        const { selectedUsername } = this.state
        if (selectedUsername) {
            this.setState({
                ...this.state,
                isTodoLoading: true
            })
        }
        if (this.state.selectedUsername) {
            const todos = await request(`${selectedUsername}?delay=1000`)
            this.setState({
                ...this.state,
                todos,
                isTodoLoading: false
            })
        }
    }

    const init = async () => {
        await fetchUserList();
    }

    init();
}