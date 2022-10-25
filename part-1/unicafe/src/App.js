import { useState } from 'react';
import Button from './components/Button';
import Header from './components/Header';
import Statistics from './components/Statistics';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <Header name={'give feedback'} />
      <div className="buttons-wrapper">
        <Button text="good" handleClick={handleGood} />
        <Button text="neutral" handleClick={handleNeutral} />
        <Button text="bad" handleClick={handleBad} />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </>
  );
}

export default App;
