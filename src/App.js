import React, { Component } from 'react';
import './App.css';
import CreateEvent from './CreateEvent/CreateEvent';
// import Header from './shared/Header/Header';

class App extends Component {
  render() {
    return (
        <React.Fragment>
          {/* <Header></Header> */}
          <CreateEvent></CreateEvent>
        </React.Fragment>
    );
  }
}

export default App;
