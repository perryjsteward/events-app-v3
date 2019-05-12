import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Redirect } from "react-router-dom";

// shared
import Spinner from './_shared/Spinner/Spinner';

// views
import CreateEvent from './CreateEvent/CreateEvent';
import ViewEvent from './ViewEvent/ViewEvent';

// Store related classes
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './_store/reducers';


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk),
  // other store enhancers if any
);

const store = createStore(reducers, enhancer);

class App extends Component {

  render() {
    return (
        <Router>
          <Provider store={store}>
            <Spinner></Spinner>
            <Route path="/" exact component={CreateEvent} />
            <Route exact path="/event" render={() => <Redirect to="/"/>}/>
            <Route path="/event/:eventId" component={ViewEvent} />
          </Provider>
        </Router>

    );
  }
}

export default App;
