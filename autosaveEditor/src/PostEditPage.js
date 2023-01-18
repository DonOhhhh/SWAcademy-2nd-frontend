import { request } from "./API.js";
import Editor from "./Editor.js";
import { getItem, setItem } from "./Storage.js";

export default function PostEditPage({ $target, initialState }) {
    const $page = document.createElement('div')
    this.state = initialState
    const TEMP_POST_SAVE_KEY = `temp-post-${this.state.postId}`
    const post = getItem(TEMP_POST_SAVE_KEY, {
        title: '',
        content: ''
    })
    let timer = null;
    const editor = new Editor({
        $target,
        initialState: this.state.post,
        onEditing: (post) => {
            if (timer !== null) {
                // 이벤트가 연속으로 발생하고 있을 때는 이벤트를 계속 지연시키다가 마지막으로 이벤트가 발생하고 일정 시간이 지났을 때 원래 지연시켰던 이벤트를 실행시킨다.
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setItem(TEMP_POST_SAVE_KEY, {
                    ...post,
                    tempSaveData: new Date()
                })
            }, 500)
        }
    })

    this.setState = async nextState => {
        if(this.state.postId !== nextState.postId) {
            this.state = nextState
            await fetchPost()
            return
        }
        this.state = nextState;
        this.render();
        editor.setState(this.state.post);
    }

    this.render = () => {
        $target.appendChild($page)
    }

    const fetchPost = async () => {
        const { postId } = this.state
        if (postId !== 'new') {
            const post = await request(`/posts/${postId}`)
            this.setState({
                ...this.state,
                post
            })
        }

    }
}