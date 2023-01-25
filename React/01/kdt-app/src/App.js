import { useRef } from 'react'
import AutuCounter from './components/AutoCounter/AutoCounter';
import Input from './components/useRef/input';

function App() {
  const inputRef = useRef();

  return <div>
    <Input ref={inputRef} />
    <button onClick={() => inputRef.current.focus()}>Focus</button>
    <AutuCounter />
  </div>
}

export default App;