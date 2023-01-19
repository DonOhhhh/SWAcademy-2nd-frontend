import { request } from "./API.js";
import PhotoList from "./PhotoList.js";

export default function App({ $target }) {
    const $h1 = document.createElement('h1')
    $h1.innerHTML = 'Cat Photos'
    $h1.style.textAlign = 'center'
    $target.appendChild($h1)

    this.state = {
        limit: 5,
        nextStart: 0, // limit 갯수만큼 계속 더해짐
        photos: [],
        totalCount: 0,
        isLoading: false
    }

    this.setState = nextState => {
        this.state = nextState
        photoListComponent.setState({
            photos: this.state.photos,
            isLoading: this.state.isLoading,
            totalCount: this.state.totalCount
        })
    }

    const photoListComponent = new PhotoList({
        $target,
        initialState: {
            isLoading: this.state.isLoading,
            photos: this.state.photos,
            totalCount: this.state.totalCount
        },
        onScrollEnded: async () => {
            await fetchPhotos();
        }
    })

    const fetchPhotos = async () => {
        this.setState({
            ...this.state,
            isLoading: true
        })
        const { limit, nextStart } = this.state
        const photos = await request(`/cat-photos?_limit=${limit}&_start=${nextStart}`)
        this.setState({
            ...this.state,
            nextStart: nextStart + limit,
            photos : this.state.photos.concat(photos),
            isLoading: false
        })
    }

    const initiallize = async () => {
        const totalCount = await request(`/cat-photos/count`)
        this.setState({
            ...this.state,
            totalCount
        })
        await fetchPhotos();
    }

    initiallize();
}