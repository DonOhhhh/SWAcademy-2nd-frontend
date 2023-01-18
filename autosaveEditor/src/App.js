import PostsPage from "./PostsPages.js";

export default function App({ $target }) {
    const postPage = new PostsPage({
        $target
    })
    postPage.render();
}