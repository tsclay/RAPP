import React from 'react';

function HelloMessage() {
  return (
    <div className="heading">
      <h1>
        <span role="img" aria-label="emoji">
          🐘
        </span>{' '}
        Hello, RAPP app!{' '}
        <span role="img" aria-label="emoji">
          🐘
        </span>
      </h1>
    </div>
  );
}

export default HelloMessage;
