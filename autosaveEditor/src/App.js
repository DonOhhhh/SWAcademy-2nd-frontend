import PostEditPage from "./PostEditPage.js";
import PostsPage from "./PostsPages.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
    // url 규칙
    // 루트: postsPage 그리기
    // /posts/{id} - id에 해당하는 post 생성
    // /posts/new - 새 post 생성
    const postsPage = new PostsPage({
        $target
    })
    const postEditPage = new PostEditPage({
        $target,
        initialState: {
            postId: 'new',
            post: {
                title: '',
                content: ''
            }
        }
    })

    this.route = () => {
        $target.innerHTML = ``
        const { pathname } = window.location
        if (pathname === '/') {
            postsPage.setState();
        } else if (pathname.indexOf('/posts/') === 0) {
            const [, , postId] = pathname.split('/')
            postEditPage.setState({ postId })
        }
    }
    window.addEventListener('popstate', this.route)
    initRouter(this.route);
    this.route();
}