import React from 'react';

const Button = ({ text, handleClick }) => {
  return (
    <button text={text} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
