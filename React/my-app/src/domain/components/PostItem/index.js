import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Spinner } from "../../../base/components";
import { usePostContext } from "../../contexts/PostProvider";

const PostItem = ({ post }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { onDeletePost } = usePostContext();

    const handleDeletePost = useCallback(
        async (id) => {
            setIsLoading(true);
            await onDeletePost(id);
            setIsLoading(false);
        },
        [onDeletePost]
    );

    return (
        <li>
            <Header strong level={3}>
                {post.title}
            </Header>
            <Link to={`/posts/${post.id}`}>Detail &rarr;</Link>
            <div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <button onClick={() => handleDeletePost(post.id)}>
                        Delete
                    </button>
                )}
            </div>
        </li>
    );
};

export default PostItem;
