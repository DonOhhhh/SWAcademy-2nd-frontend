export default function PostList({ $target, initialState }) {
    const $postLIst = document.createElement('div')
    $target.appendChild($postLIst)

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $postLIst.innerHTML = `
        <ul>
        ${this.state.map(post => `
            <li data-id=${post.id}>${post.title}</li>
        `).join('')}
        </ul>
        `
    }

    this.render();

    $postLIst.addEventListener('click', (e) => {
        const $li = e.target.closest('li')
        if ($li) {
            const { id } = $li.dataset
            window.dispatchEvent(new CustomEvent('route-change', {
                detail: { id }
            }))
        }
    })
}