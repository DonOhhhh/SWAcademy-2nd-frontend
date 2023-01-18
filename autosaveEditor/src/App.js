import PostEditPage from "./PostEditPage.js";
import PostsPage from "./PostsPages.js";

export default function App({ $target }) {
    // const postPage = new PostsPage({
    //     $target
    // })
    // postPage.render();
    const postEditPage = new PostEditPage({
        $target,
        initialState : {
            postId: 'new'
        }
    })

    postEditPage.setState({
        postId: 1
    });
}