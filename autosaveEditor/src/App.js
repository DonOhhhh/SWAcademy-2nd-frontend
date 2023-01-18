import Editor from "./Editor.js";
import PostsPage from "./PostsPages.js";
import { getItem, setItem } from "./Storage.js";

export default function App({ $target }) {
    // const postPage = new PostsPage({
    //     $target
    // })
    // postPage.render();
    const TEMP_POST_SAVE_KEY = 'temp-post'
    const post = getItem(TEMP_POST_SAVE_KEY, {
        title: '',
        content: ''
    })
    let timer = null;
    const editor = new Editor({
        $target,
        initialState: post,
        onEditing: (post) => {
            // 이벤트가 연속으로 발생하고 있을 때는 이벤트를 계속 지연시키다가 마지막으로 이벤트가 발생하고 일정 시간이 지났을 때 원래 지연시켰던 이벤트를 실행시킨다.
            timer = setTimeout(() => {
                setItem(TEMP_POST_SAVE_KEY, {
                    ...post,
                    tempSaveData: new Date()
                })
            }, 2000)
        }
    })
}