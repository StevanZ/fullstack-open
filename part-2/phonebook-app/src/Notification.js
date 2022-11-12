import React from 'react';

const Notification = ({ message, error }) => {
  if (message === null && error === null) return null;

  let notification = '';
  if (message) {
    notification = 'message';
  } else if (error) {
    notification = 'error';
  }

  return <div className={notification}>{message ? message : error}</div>;
};

export default Notification;
