import { Post } from "@/interface";
import axios from "axios";
import Link from "next/link";

export const getServerSideProps = async () => {
    const { data: posts } = await axios.get("http://localhost:3000/api/posts");

    return {
        props: { posts },
    };
};

interface Props {
    posts: Post[];
}

export default function HomePage({ posts }: Props) {
    return (
        <div>
            Home
            <ul>
                {posts.map((post) => (
                    <Link
                        href="/posts/[id]"
                        as={`/posts/${post.id}`}
                        key={post.id}
                        // passHref
                    >
                        <li>{post.title}</li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
