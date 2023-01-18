import { request } from "./API.js";
import LinkButton from "./LinkButton.js";
import PostList from "./PostList.js";

export default function PostsPage({ $target }) {

    const $page = document.createElement('div')

    // this.state = initialState

    // this.setState = (nextState) => {
    //     this.state = nextState;
    //     this.render();
    // }

    const postList = new PostList({
        $target: $page,
        initialState: []
    })

    new LinkButton({
        $target: $page,
        initialState: {
            text: 'New Post',
            link: '/posts/new'
        }
    })

    this.setState = async () => {
        const posts = await request('/posts')
        postList.setState(posts);
        this.render();
    }

    this.render = async () => {
        $target.appendChild($page);
    }
}