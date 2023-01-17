import { request } from "../api.js"
import Cart from "../cart.js"
import ProductOptions from "../ProductOptions.js"

export default function ProductPage({ $target, initialState }) {
    const $product = document.createElement('div')
    const productOptions = new ProductOptions({
        $target: $product,
        initialState: initialState,
        onSelect: (option) => {
            const nextState = { ...this.state }
            const { selectedOptions } = this.state;
            const selectedOptionIndex = selectedOptions.findIndex(selectedOption => selectedOption.optionId === option.optionId)
            if (selectedOptionIndex > -1) {
                nextState.selectedOptions[selectedOptionIndex].ea++
            } else {
                nextState.selectedOptions.push({
                    optionId: option.optionId,
                    optionName: option.optionName,
                    optionPrice: option.optionPrice,
                    ea: 1
                })
            }
            this.setState(nextState)
        }
    })

    const cart = new Cart({
        $target: $product,
        initialState: {
            productName: '',
            basePrice: 0,
            selectedOptions: []
        },
        onRemove: (selectedOptionIndex) => {
            const nextState = { ...this.state }
            // 원본 배열에서 index에서부터 1개의 배열을 뺀 후 그 값을 돌려준다.(pop이랑 비슷함)
            const splicedValue = nextState.selectedOptions.splice(selectedOptionIndex, 1);
            this.setState(nextState)
        }
    })

/*
this.state 구조
{
    productId: 1,
    product: Product,
    optionData: []
    selectedOption: []
}
*/

    this.state = initialState;

    this.setState = nextState => {
        if (nextState.productId !== this.state.productId) {
            fetchOptionData(nextState.productId)
            return
        }
        this.state = nextState
        const { product, selectedOptions, optionData } = this.state
        productOptions.setState(this.state.optionData)
        cart.setState({
            productName: product.name,
            basePrice: product.basePrice,
            selectedOptions: selectedOptions
        })
        this.render();
    }

    this.render = () => {
        $target.appendChild($product)
    }

    const fetchOptionData = (productId) => {
        return request(`products/${productId}`)
            .then(product => {
                this.setState({
                    ...this.state,
                    product,
                    optionData: [],
                    selectedOptions: []
                })
                return request(`product-options?product.id=${product.id}`)
            })
            .then(productOptions => {
                return Promise.all([
                    Promise.resolve(productOptions),
                    Promise.all(
                        productOptions.map(productOption => productOption.id).map(id => {
                            return request(`product-option-stocks?productOption.id=${id}`)
                        })
                    ) // api로 호출할 데이터가 많다면 몇 개 단위로 묶어서 데이터를 전송받을 수 있는 api를 백엔드에 만들어달라고 요청할 것!
                ])
            })
            .then(data => {
                const [productOptions, stocks] = data
                const optionData = productOptions.map((productOption, i) => {
                    const stock = stocks[i][0].stock

                    return {
                        optionId: productOption.id,
                        optionName: productOption.optionName,
                        optionPrice: productOption.optionPrice,
                        stock
                    }
                })
                this.setState({
                    ...this.state,
                    optionData
                })
            })
    }
}
