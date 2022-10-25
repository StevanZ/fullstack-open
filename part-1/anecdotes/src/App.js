import { useState } from 'react';
import Button from './Button';
import Header from './Header';

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
];

function App() {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] = copy[selected] + 1;

    setVotes(copy);
  };

  const findAnecdoteWithMostVotes = () => {
    const maxVotes = Math.max(...votes);

    const index = votes.findIndex((anecdote) => anecdote === maxVotes);

    console.log('maxVotes', maxVotes);
    console.log('index', index);

    if (maxVotes === 0) {
      return <p>There is no votes for any anecdotes</p>;
    }

    if (index > -1) {
      return (
        <div>
          <p>{anecdotes[index]}</p>
          <p>has {votes[index]} votes</p>
        </div>
      );
    }
  };

  return (
    <div>
      <Header name="Anecdote od the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="next anecdote" handleClick={handleNextAnecdote} />
      <Button text="vote" handleClick={handleVote} />
      <Header name="Anecdote with most votes" />
      {findAnecdoteWithMostVotes()}
    </div>
  );
}

export default App;
