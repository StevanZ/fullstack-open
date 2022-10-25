import { useState } from 'react';
import Button from './Button';
import Header from './Header';
import StatisticLine from './StatisticLine';

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  const average = (good - bad) / total;
  const positive = (good / total) * 100 + ' %';

  return total ? (
    <table>
      <thead>
        <tr>
          <th>
            <Header name={'Statistics'} />
          </th>
        </tr>
      </thead>

      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  ) : (
    <p>There is no feedback!</p>
  );
};

export default Statistics;
