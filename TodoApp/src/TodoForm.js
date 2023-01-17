export default function TodoForm({ $target, onSubmit }) {
    const $form = document.createElement('form')

    $target.appendChild($form);

    // 사용자가 작업을 할 때는 UI를 막는 처리를 한다.
    // blocking을 최소화하고 UI도 막지 않고 서버와의 통신도 되도록 할 것임.

    this.render = () => {
        $form.innerHTML =
        `
        <input type="text" placeholder="할 일을 입력하세요.">
        <button>추가하기</button>
        `
    }

    $form.addEventListener('submit',(e) => {
        e.preventDefault();
        const $input = $form.querySelector('input')
        const content = $input.value
        onSubmit(content)
        $input.value = ''
    })
    this.render();
}