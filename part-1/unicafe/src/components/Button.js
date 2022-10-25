import React from 'react';

const Button = ({ text, handleClick }) => {
  return (
    <button style={{ marginRight: '5px' }} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
