import React from 'react';
import { Counter } from './Counter';

export class App extends React.PureComponent {
  state = {
    count: 0,
    increase: () => this.setState({ count: this.state.count + 1 }),
    decrease: () => this.setState({ count: this.state.count - 1 }),
  }

  render () {
    const Context = React.createContext(this.state);

    return (
      <Context.Provider value={this.state}>
        <Counter context={Context} />
      </Context.Provider>
    );
  }
}
