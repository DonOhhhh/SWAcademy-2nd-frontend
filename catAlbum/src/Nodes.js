export default function Nodes({ $target, initialState, onClick }) {
    const $nodes = document.createElement('div')
    $nodes.classList.add('Nodes')
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
            <img src="https://cdn.roto.codes/images/prev.png"/>
        </div>
        `}
        ${nodes.map(node => `
        <div class="Node" data-id="${node.id}">
            <img src="https://cdn.roto.codes/images/${node.type === 'DIRECTORY' ? 'directory' : 'file'}.png">
            ${node.name}
        </div>
        `).join('')}
        `
    }

    $nodes.addEventListener('click', e => {
        const $node = e.target.closest('.Node')
        const { id } = $node.dataset
        // id가 없는 경우 뒤로가기를 누름
        if(!id) {

        }
        
        const node = this.state.nodes.find(node => node.id === id)
        if(node) {
            onClick(node);
        } else {
            alert('올바르지 않은 노드입니다.')
        }
    })
}