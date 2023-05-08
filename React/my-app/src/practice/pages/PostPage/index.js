import axios from "axios";
import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import { Spinner, Header, Text } from "../../../base/components";
import { useAsync } from "../../../base/hooks";

export async function loader({ params }) {
    const { postId } = params;
    return postId;
}

// id 값을 받아서 useAsync를 이용해서 post 정보를 불러온다.
const PostPage = () => {
    const postId = useLoaderData();
    const post = useAsync(async () => {
        return await axios
            .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then((response) => response.data);
    }, [postId]);

    return (
        <div>
            {post.isLoading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Header strong>{post.value?.title}</Header>
                    <Text>{post.value?.body}</Text>
                </Fragment>
            )}
        </div>
    );
};

export default PostPage;
