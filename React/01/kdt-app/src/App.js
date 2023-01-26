import { useState } from 'react';
import './App.css';
import Counter from './components/Counter';

function App() {
  const [totalCount, setTotalCount] = useState(0);
  return (<div>
    TotalCount: {totalCount}
    <Counter
      onIncrease={count => setTotalCount(totalCount + 1)}
      onDecrease={count => setTotalCount(totalCount - 1)}
    />
    <Counter
      onIncrease={count => setTotalCount(totalCount + 1)}
      onDecrease={count => setTotalCount(totalCount - 1)}
    />
    <Counter
      onIncrease={count => setTotalCount(totalCount + 1)}
      onDecrease={count => setTotalCount(totalCount - 1)}
    />
  </div>);
}

export default App;
