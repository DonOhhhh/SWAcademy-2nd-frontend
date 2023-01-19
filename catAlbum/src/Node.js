export default function Node({ $target, initialState, onClick }) {
    const $nodes = document.createElement('div')
    $nodes.classList.add('nodes')
    $target.appendChild($nodes)
    this.state = initialState
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }
    this.render = () => {
        const { isRoot, nodes } = this.state;
        $nodes.innerHTML = `
        ${isRoot ? '' : `
        <div class="Node">
            <img src="
        </div>
        `}
        ${nodes.map(node => `
        <div class="Node>
            <img src="https://cdn.roto.codes/images/${node.type === 'DIRECTORY' ? 'directory' : 'file'}.png">
            ${node.name}
        </div>
        `)}
        `
    }
}