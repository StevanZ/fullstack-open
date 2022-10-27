import React from 'react';

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((curr, next) => {
    return curr + next.exercises;
  }, 0);

  return <h4>Total exercises: {totalExercises}</h4>;
};

export default Total;
