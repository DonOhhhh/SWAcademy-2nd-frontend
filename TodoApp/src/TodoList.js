export default function TodoList({ $target, initialState, onToggle, onRemove }) {
    const $todo = document.createElement('div')
    $target.appendChild($todo);

    /*
    {
        todos: []
    }
    */
    this.state = initialState;
    this.setState = (nextState) => {
        this.state = nextState
        this.render();
    }
    this.render = () => {
        $todo.innerHTML =
            `
        <ul>
            ${this.state.map(({ _id, content, isCompleted }) =>
                `<li data-id=${_id} class="todo-item">
                ${isCompleted ? `<s>${content}</s>` : content}
                <button class="remove">x</button>
            </li>`).join('')}
        </ul>
        `

    }
    document.addEventListener('click', (e) => {
        // 실제 이벤트를 발생시킨 곳이 어디인지 찾는 법 : closest
        const $li = e.target.closest('.todo-item')
        if ($li) {
            const { id } = $li.dataset
            const { className } = e.target
            if (className === 'remove') {
                onRemove(id);
            } else {
                onToggle(id);
            }
        }
    })
    this.render();
}