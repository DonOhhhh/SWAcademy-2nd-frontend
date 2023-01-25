import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {

  const [visible, setVisible] = useState(false);

  const articles = [{
    id: 1,
    title: '안녕하세요 프롱이 여러분',
    author: '이선협'
  }, {
    id: 2,
    title: '프로젝트를 성공시키는 법',
    author: '이선협'
  }, {
    id: 3,
    title: 'React 꿀팁 공유',
    author: '김선협'
  }, {
    id: 4,
    title: '7일만에 React 마스터하기',
    author: '박선협'
  }]

  return <div>
    <button onClick={() => setVisible(!visible)}>Toggle</button>
    {visible && <h1>논리곱 연산자를 통해 쉽게 JSX 렌더링 여부를 결정할 수 있다.</h1>}
    {visible ? <Board articles={articles} /> : <p>게시판을 보려면 Toggle 버튼을 클릭해주세요.</p>}
  </div>;
}

export default App;
