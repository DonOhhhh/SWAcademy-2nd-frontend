import { request } from "./API.js";
import PostList from "./PostList.js";

export default function PostsPage({ $target }) {

    const $page = document.createElement('div')

    // this.state = initialState

    // this.setState = (nextState) => {
    //     this.state = nextState;
    //     this.render();
    // }
    
    const postList = new PostList({
        $target,
        initialState: [],
        onPostClick: (id) => {
            console.log(this.state.find(e => e.id === id));
        }
    })

    const $newPostButton = document.createElement('button')
    $newPostButton.textContent = 'New Post'
    $page.appendChild($newPostButton)

    const fetchPosts = async () => {
        const posts = await request('/posts')
        postList.setState(posts)
    }

    this.render = async () => {
        await fetchPosts();
        $target.appendChild($page);
    }
}