import React from 'react';

const Total = ({ parts }) => {
  return (
    <div>
      Total exercises:{' '}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </div>
  );
};

export default Total;
