import React, { Component } from 'react';
import './App.css';
import CreateEvent from './CreateEvent/CreateEvent';
import Spinner from './_shared/Spinner/Spinner';

// import Header from './_shared/Header/Header';

// Store related classes
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './_store/reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <Spinner></Spinner>
          {/* <Header></Header> */}
          <CreateEvent></CreateEvent>
        </Provider>
    );
  }
}

export default App;
