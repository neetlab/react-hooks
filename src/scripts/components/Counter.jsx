import React, { useContext } from 'react';

export const Counter = ({ context }) => {
  const state = useContext(context);

  return (
    <div>
      Counter:

      <button onClick={() => state.increase()}>
        Plus
      </button>

      <button onClick={() => state.decrease()}>
        Minus
      </button>

      <span>
        { state.count }
      </span>
    </div>
  );
}
