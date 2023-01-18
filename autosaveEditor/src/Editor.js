export default function Editor({
    $target,
    initialState = { title: '', content: '' },
    onEditing
}) {

    const $editor = document.createElement('div')
    $target.appendChild($editor)

    let isInitialized = false;

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').innerHTML = this.state.content.replace(/\n/g,'<br>')
        // 서버에서 내려오는 개행값 \n
        // textarea에서는 \n으로 개행을 처리해줌.
        this.render();
    }

    this.render = () => {
        if (!isInitialized) {
            $editor.innerHTML = `
            <input type="text" name="title" style="width:600px;display:block;" value="${this.state.title}"/>
            <div name="content" contentEditable="true" style="width:600px; height:400px;">${this.state.content}</div>
            `
            isInitialized = true
        }
    }
    this.render();

    $editor.addEventListener('keyup', e => {
        const { target } = e;
        const name = target.getAttribute('name')
        if (this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                [name]: target.value
            }
            this.setState(nextState)
            onEditing(this.state)
        }
    })
}