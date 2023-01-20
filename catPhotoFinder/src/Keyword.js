export default function Keyword({ $target, initialState, onKeywordInput, onEnter }) {
    const $keyword = document.createElement('input')
    $keyword.className = 'Keyword'
    $target.appendChild($keyword)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        $keyword.value = nextState.value
    }

    $keyword.addEventListener('keyup', e => {
        if (e.target.value.trim().length > 1) {
            if (e.key === 'Enter') {
                onEnter(e.target.value);
            } else {
                onKeywordInput(e.target.value);
            }
        }
    })
}