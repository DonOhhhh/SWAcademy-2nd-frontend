import { request } from "./API.js";
import SyncTasksManager from "./SyncTaskManager.js";
import TaskQueue from "./taskQueue.js";
import TodoList from "./TodoList.js";

export default function App({ $target }) {

    const taskQueue = new TaskQueue();
    const syncTaskQueue = new SyncTasksManager();
    const dropHandler = async (todoId, isCompleted) => {
        const nextTodos = [...this.state.todos]
        const todoIndex = nextTodos.findIndex(todo => todo._id === todoId)
        nextTodos[todoIndex].isCompleted = isCompleted
        this.setState({
            ...this.state,
            todos: nextTodos
        })

        // taskQueue.addTasks(async () => {
        //     const todos = await request(`/${todoId}/toggle`, {
        //         method: 'PUT'
        //     })
        // })
        syncTaskQueue.addTask({
            url: `/${todoId}/toggle`,
            method: 'PUT'
        })
    }
    const removeHandler =  async (todoId) => {
        let nextTodos = [...this.state.todos]
        nextTodos = nextTodos.filter(todo => todo._id !== todoId)
        this.setState({
            ...this.state,
            todos: nextTodos
        })

        syncTaskQueue.removeTasks(`/${todoId}`)

        syncTaskQueue.addTask({
            url: `/${todoId}`,
            method: 'DELETE'
        })
    }

    const incompletedTodoList = new TodoList({
        $target,
        initialState: {
            title: '완료되지 않은 일들',
            todos: []
        },
        onDrop: (todoId) => dropHandler(todoId, false),
        onRemove: removeHandler
    });

    const completedTodoList = new TodoList({
        $target,
        initialState: {
            title: '완료된 일들',
            todos: []
        },
        onDrop: (todoId) => dropHandler(todoId, true),
        onRemove: removeHandler
    })

    this.state = {
        todos: []
    }

    this.setState = nextState => {
        this.state = nextState;
        const { todos } = this.state;
        incompletedTodoList.setState({
            ...incompletedTodoList.state,
            todos: todos.filter(todo => !todo.isCompleted)
        })

        completedTodoList.setState({
            ...completedTodoList.state,
            todos: todos.filter(todo => todo.isCompleted)
        })
    }

    const fetchTodos = async () => {
        const todos = await request()
        this.setState({
            ...this.state,
            todos
        })
    }

    fetchTodos();

    const $button = document.createElement('button');
    $button.textContent = '변경내용 동기화'
    $target.appendChild($button);
    // $button.addEventListener('click', () => taskQueue.run())
    $button.addEventListener('click', () => syncTaskQueue.run())
}