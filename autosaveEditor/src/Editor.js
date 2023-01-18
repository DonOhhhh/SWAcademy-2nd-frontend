export default function Editor({
    $target,
    initialState = { title: '', content: '' },
    onEditing
}) {

    const $editor = document.createElement('div')
    $target.appendChild($editor)

    $editor.innerHTML = `
    <input type="text" name="title" style="width:600px;display:block;"/>
    <div name="content" contentEditable="true" style="width:600px; height:400px; border: 1px solid black; padding: 8px;"></div>
    `

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        const richContent = this.state.content.split('\n').map(line => {
            if(line.indexOf('# ') === 0) {
                return `<h1>${line.substring(2)}</h1>`
            } else if (line.indexOf('## ') === 0) {
                return `<h2>${line.substring(2)}</h2>`
            }
            return line
        }).join('<br>')
        
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').innerHTML = richContent
    }
    this.render();

    $editor.querySelector('[name=content]').addEventListener('input', e => {
        const nextState = {
            ...this.state,
            content: e.target.innerHTML
        }
        this.setState(nextState);
        onEditing(this.state);
    })

    $editor.querySelector('[name=title]').addEventListener('keyup', e => {
        const { target } = e;
        const name = target.getAttribute('name')
        if (this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                title: e.target.value
            }
            this.setState(nextState)
            onEditing(this.state)
        }
    })
}