export default function TodoComments({ $target, initialState }) {
    const $element = document.createElement('div')
    $target.appendChild($element);

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        const { selectedTodo, comments } = this.state;
        $element.innerHTML =
        `
        <h2>${selectedTodo.text}μ λκΈλ€</h2>
        <ul>
            ${comments.map(({ text }) => `<li>${text}</li>`).join('')}
        </ul>
        `
    }

    this.render();
}