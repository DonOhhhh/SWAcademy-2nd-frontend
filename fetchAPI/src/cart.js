/*
state의 형태
{
    productName: 상품명
    basePrice: 상품 기본 가격,
    selectedOptions: 선택한 상품에 대한 정보
}
*/

export default function Cart({ $target, initialState, onRemove }) {
    const $cart = document.createElement('div')

    $target.appendChild($cart)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    const calculatedTotlaPrice = () => {
        const { basePrice, selectedOptions } = this.state;
        return selectedOptions.length ? selectedOptions.reduce((acc, option) => acc + ((basePrice + option.optionPrice) * option.ea), 0) : 0;
    }

    const renderOption = (option, index) => {
        const { productName, basePrice, selectedOptions } = this.state
        return `
        <li data-index="${index}" class="cartItem">
            ${productName} - ${option.optionName} | ${basePrice + option.optionPrice}, ${option.ea}개 
            <button class="remove">x</button>
        </li>
        `
    }

    this.render = () => {
        const { selectedOptions } = this.state

        $cart.innerHTML =
            `
        <ul>
            ${Array.isArray(selectedOptions) && selectedOptions.map((option, i) => renderOption(option, i)).join('')}
        </ul>
        <div>
            ${calculatedTotlaPrice()}원
        </div>
        `
        $cart.querySelectorAll('.remove').forEach($button => {
            $button.addEventListener('click', (e) => {
                const $li = e.target.closest('.cartItem')
                if ($li) {
                    // 요소.dataset으로 해당 요소에 data-x로 붙은 모든 값들을 불러올 수 있다. 
                    // 여기서는 index만 필요하기 때문에 { index }로 index만 추출하였다.
                    const { index } = $li.dataset
                    onRemove(parseInt(index));
                }
            })
        })
    }

    this.render();
}