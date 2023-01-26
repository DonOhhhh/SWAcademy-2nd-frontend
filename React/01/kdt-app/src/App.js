import logo from './logo.svg';
import './App.css';

function App() {
  const name = '리액트'
  const showLink = false;
  const showLogo = 'none';
  const names = ['React', 'Vue', 'Angular'];

  return (
    <div className="App">
      <header className="App-header">
        {
          showLogo === 'show' ?
            <img src={logo} className="App-logo" alt="logo" />
            : <h1>React</h1>
        }
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {showLink && (<a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn {name}
        </a>)}

        <ul>
          {
            names.map(item => {
              return <li key={item}>{item}</li>
            })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
