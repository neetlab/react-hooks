import React, { useContext } from 'react';
import { Context } from '../context';

export const Counter = () => {
  const { state, dispatch } = useContext(Context);

  return (
    <div>
      Counter:

      <button onClick={() => dispatch({ type: 'INCREASE' })}>
        Plus
      </button>

      <button onClick={() => dispatch({ type: 'DECREASE' })}>
        Minus
      </button>

      <button onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>

      <span>
        { state.count }
      </span>
    </div>
  );
}
