import React, { useReducer } from 'react';
import { Counter } from './Counter';
import { Context } from '../context';

const reducer = (state, action) => {
  switch(action.type) {
    case "INCREASE":
      return { count: state.count + 1 };
    case "DECREASE":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

export const App = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Counter />
    </Context.Provider>
  );
}
