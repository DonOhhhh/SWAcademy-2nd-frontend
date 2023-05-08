import axios from "axios";
import { useCallback } from "react";
import { Header, Spinner } from "../../../base/components";
import { useAsync } from "../../../base/hooks";
import { PostList, PostAddForm } from "../../../domain/components";
import PostProvider from "../../../domain/contexts/PostProvider";

const PostsPage = () => {
    const initialPosts = useAsync(async () => {
        return await axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.data);
    }, []);

    const handleAddPost = useCallback(async (post) => {
        return await axios
            .post(`https://jsonplaceholder.typicode.com/posts/`, post)
            .then((response) => response.data);
    }, []);

    const handleDeletePost = useCallback(async (id) => {
        return await axios
            .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(() => ({ id }));
    }, []);

    return (
        <PostProvider
            initialPosts={initialPosts.value}
            handleDeletePost={handleDeletePost}
            handleAddPost={handleAddPost}
        >
            <div>
                <Header>Posts</Header>
                <PostAddForm />
                {initialPosts.isLoading ? <Spinner /> : <PostList />}
            </div>
        </PostProvider>
    );
};

export default PostsPage;
