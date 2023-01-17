export default function UserList({ $target, initialState, onSelect, onRemove }) {
    const $userList = document.createElement('div')
    $target.appendChild($userList)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render();
    }

    this.render = () => {
        $userList.innerHTML =
            `
        <h1>Users</h1>
        <ul>
            ${this.state.map(username =>
                `<li data-username="${username}">
                ${username}
                <button data-username="${username}">
                    x
                </button>
            </li>`
            ).join('')}
            <li>
                <form>
                    <input class="new-user" type="text" placeholder="Add Username">
                </form>
            </li>
        </ul>
        `
    }

    this.render()

    $userList.addEventListener('click', e => {
        const $li = e.target.closest('li[data-username]')
        if ($li) {
            const { username } = $li.dataset
            onSelect(username);
        }
        const $btn = e.target.closest('button[data-username]')
        if ($btn) {
            const { username } = $btn.dataset
            onRemove(username)
        }
    })

    $userList.addEventListener('submit', e => {
        const $newUser = $userList.querySelector('.new-user')
        const newUserValue = $newUser.value;
        if (newUserValue.length) {
            onSelect($newUser.value)
            $newUser.value = ''
        }
    })

}