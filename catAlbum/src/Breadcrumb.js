export default function BreadCrumb({ $target, initialState, onClick }) {
    const $breadcrumb = document.createElement('nav')
    $breadcrumb.className = 'Breadcrumb'
    $target.appendChild($breadcrumb)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render();
    }

    this.render = () => {
        $breadcrumb.innerHTML = `
        <div class="BreadCrumb_item">Root</div>
        ${this.state.map(({ id, name }) => {
            return `<div class="BreadCrumb_item" data-id="${id}">${name}</div>`
        }).join('')}
        `
    }

    $breadcrumb.addEventListener('click', e => {
        const $breadcrumbItem = e.target.closest('.BreadCrumb_item')
        const { id } = $breadcrumbItem.dataset
        onClick(id);
    })
}