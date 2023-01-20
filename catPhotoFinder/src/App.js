import SearchResults from "../SearchResults.js"
import { request } from "./API.js"
import Debounce from "./Debounce.js"
import Header from "./Header.js"
import { getItem, setItem } from "./Storage.js"
import SuggestKeywords from "./SuggestKeywords.js"

export default function App({ $target }) {
    this.state = {
        keyword: '',
        keywords: [],
        catImages: []
    }
    this.setState = nextState => {
        this.state = nextState
        header.setState({
            keyword: this.state.keyword
        })
        suggestKeywords.setState({
            keywords: this.state.keywords
        })
        searchResults.setState(this.state.catImages)
    }

    const header = new Header({
        $target,
        initialState: {
            keyword: this.state.keyword
        },
        onKeywordInput: Debounce(async (keyword) => {
            this.setState({
                ...this.state,
                keywords
            })
        }, 300),
        onEnter: (keyword) => {
            this.setState({
                ...this.state,
                keyword
            })
            fetchCatsImage();
        }
    })

    const suggestKeywords = new SuggestKeywords({
        $target,
        initialState: {
            keywords: this.state.keywords,
            cursor: -1 // -1이 아닌 경우 ↑을 누르면 1씩 감소, ↓을 누르면 1씩 증가
        },
        onKeywordSelect: (text) => {
            this.setState({
                ...this.state,
                keyword: text,
                keywords: []
            })
            fetchCatsImage();
        }
    })

    const searchResults = new SearchResults({
        $target,
        initialState: this.state.catImages
    })

    const fetchCatsImage = async () => {
        // obj에 아무것도 없으면 return
        const obj = await request(`/search?q=${this.state.keyword}`)
        if (obj === undefined) {
            alert('내부 오류! 잠시 뒤에 시도해주세요')
            return
        }
        // obj에 data가 빈 배열이면 return
        const { data } = obj;
        if (!data.length) {
            alert('검색결과가 존재하지 않습니다.')
            return
        }
        this.setState({
            ...this.state,
            catImages: data,
            keywords: []
        })
    }
}