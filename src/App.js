import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

// shared
import Spinner from './_shared/Spinner/Spinner';

// views
import CreateEvent from './CreateEvent/CreateEvent';
import ViewEvent from './ViewEvent/ViewEvent';

// Store related classes
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './_store/reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

class App extends Component {

  render() {
    return (
        <Router>
          <Provider store={store}>
            <Spinner></Spinner>
            <Route path="/" exact component={CreateEvent} />
            <Route path="/event/:eventId" component={ViewEvent} />
          </Provider>
        </Router>

    );
  }
}

export default App;
