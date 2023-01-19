import { request } from "./API.js";
import PhotoList from "./PhotoList.js";

export default function App({ $target }) {
    const $h1 = document.createElement('h1')
    $h1.innerHTML = 'Cat Photos'
    $h1.style.textAlign = 'center'
    $target.appendChild($h1)

    this.state = {
        limit: 5,
        start: 0, // limit 갯수만큼 계속 더해짐
        photos: []
    }

    this.setState = nextState => {
        this.state = nextState
        photoListComponent.setState(this.state.photos)
    }

    
    const photoListComponent = new PhotoList({
        $target,
        initialState: this.state.photos,
        onScrollEnded: async () => {
            
        }
    })

    const fetchPhotos = async () => {
        const photos = await request(`/cat-photos?_limit=${this.state.limit}&_start=${this.state.start}`)
        this.setState({
            ...this.state,
            photos
        })
    }
    
    fetchPhotos();
}