import React, { Component } from 'react';
import './App.css';
import CreateEvent from './CreateEvent/CreateEvent';

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <CreateEvent></CreateEvent>
        </React.Fragment>
    );
  }
}

export default App;
