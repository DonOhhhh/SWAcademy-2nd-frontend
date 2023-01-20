import Header from "./Header.js"

export default function App({ $target }) {
    this.state = {}
    this.setState = nextState => {
        this.state = nextState
    }

    const header = new Header({
        $target, 
        onKeywordInput: (keyword) => {
            if(keyword.trim().length > 1) {
                console.log(keyword)
            }
        }
    })
}