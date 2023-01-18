import { request } from "./API.js";
import Editor from "./Editor.js";
import { getItem, setItem } from "./Storage.js";

export default function PostEditPage({ $target, initialState }) {
    const $page = document.createElement('div')
    this.state = initialState

    let postLocalSaveKey = `temp-post-${this.state.postId}`
    const post = getItem(postLocalSaveKey, {
        title: '',
        content: ''
    })

    let timer = null;
    const editor = new Editor({
        $target,
        initialState: {
            title: '',
            content: ''
        },
        onEditing: (post) => {
            if (timer !== null) {
                // 이벤트가 연속으로 발생하고 있을 때는 이벤트를 계속 지연시키다가 마지막으로 이벤트가 발생하고 일정 시간이 지났을 때 원래 지연시켰던 이벤트를 실행시킨다.
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                setItem(postLocalSaveKey, {
                    ...post,
                    tempSaveData: new Date()
                })

                const isNew = this.state.postId === 'new'
                if(isNew) {
                    const createdPost = await request('/posts', {
                        method: 'POST',
                        body: JSON.stringify(this.state)
                    })
                    history.replaceState(null, null, `/posts/${createdPost.id}`)
                }
            }, 500)
        }
    })

    this.setState = async nextState => {
        if (this.state.postId !== nextState.postId) {
            postLocalSaveKey = `temp-post-${this.state.postId}`
            this.state = nextState
            await fetchPost()
            return
        }
        this.state = nextState;
        this.render();
        editor.setState(this.state.post || {
            title: '',
            content: ''
        });
    }

    this.render = () => {
        $target.appendChild($page)
    }

    const fetchPost = async () => {
        const { postId } = this.state
        if (postId !== 'new') {
            const post = await request(`/posts/${postId}`)
            const tempPost = getItem(postLocalSaveKey, {
                title: '',
                content: ''
            })
            if (tempPost.tempSaveData && tempPost.tempSaveData > post.updated_at) {
                if (confirm('저장되지 않은 데이터가 있습니다. 불러올까요?')) {
                    this.setState({
                        ...this.state,
                        post: tempPost
                    })
                    return
                }
            }
            this.setState({
                ...this.state,
                post
            })
        }

    }
}