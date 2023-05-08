import { Spinner } from "../../../base/components";
import { useForm } from "../../../base/hooks";
import { usePostContext } from "../../contexts/PostProvider";

const PostAddForm = ({ onSubmit }) => {
    const { onAddPost } = usePostContext();
    const { isLoading, errors, handleChange, handleSubmit } = useForm({
        initialValues: {
            title: "",
            body: "",
            userId: 1,
        },
        onSubmit: async (values) => {
            await onAddPost(values);
        },
        validate: ({ title, body }) => {
            const errors = {};
            if (!title) errors.title = "제목을 입력해주세요";
            if (!body) errors.body = "내용을 입력해주세요";
            return errors;
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="title"
                />
                {errors.title}
            </div>
            <div>
                <input
                    type="text"
                    name="body"
                    onChange={handleChange}
                    placeholder="body"
                />
                {errors.body}
            </div>
            {isLoading ? <Spinner /> : <button type="submit">Add</button>}
        </form>
    );
};

export default PostAddForm;
