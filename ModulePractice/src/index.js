// 다른 모듈에서 정의한 것을 불러옴.
import { DOMAIN_NAME, PORT} from './constants.js'
import App, { printToday } from './App.js' // App.js에 export default로 정의된 App이라는 변수 또는 함수가 존재해야 함.

const $body = document.querySelector('body')

$body.innerHTML = $body.innerHTML + JSON.stringify(DOMAIN_NAME) + JSON.stringify(PORT)

printToday();
new App();