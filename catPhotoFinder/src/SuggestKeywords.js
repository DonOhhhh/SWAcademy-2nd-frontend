export default function SuggestKeywords({ $target, initialState, onKeywordSelect }) {
    const $suggest = document.createElement('div');
    $suggest.className = 'Keywords'
    $target.appendChild($suggest)
    this.state = initialState
    this.setState = nextState => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    }

    this.render = () => {
        const { keywords, cursor } = this.state
        $suggest.innerHTML = `
        ${keywords.map((keyword, i) => {
            return `<li class="${cursor === i ? 'active' : ''}">${keyword}</li>`
        }).join('')}
        `
        $suggest.style.display = keywords.length ? 'block' : 'none'
    }

    $suggest.addEventListener('click', e => {
        const $li = e.target.closest('li')
        if ($li) {
            // li 태그 밑에 html 요소가 있어도 text만 추출한다.
            onKeywordSelect($li.textContent)
        }
    })

    window.addEventListener('keydown', e => {
        if ($suggest.style.display !== 'none') {
            const { keywords, cursor } = this.state
            if (e.key === 'ArrowUp') {
                this.setState({
                    ...this.state,
                    cursor: cursor < 0 ? (keywords.length - 1) : (cursor - 1)
                })
            } else if (e.key === 'ArrowDown') {
                this.setState({
                    ...this.state,
                    cursor: cursor >= keywords.length ? 0 : cursor + 1
                })
            } else if (e.key === 'Enter') {
                const activatedElem = document.querySelector('li.active')
                if (activatedElem)
                    onKeywordSelect(keywords[cursor])
            }
        }
    })
}