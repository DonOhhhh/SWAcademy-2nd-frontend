import Box from "./components/Box";
import Checkbox from "./components/Checkbox";
import useHover from "./hooks/useHover";
import useKeyPress from "./hooks/useKeyPress";
import useToggle from "./hooks/useToggle";

function App() {
  const [on, toggle] = useToggle();
  const [ref, isHover] = useHover();
  const keyPressed = useKeyPress('a');

  return (
    <div>
      <Checkbox checked={on} onChange={toggle} />
      {/* <button onClick={toggle}>{on ? 'True' : 'False'}</button> */}
      {isHover ? 'hover' : 'mouseout'}
      <Box ref={ref} />

      {keyPressed && 'Pressed'}
    </div>
  )
}

export default App;