import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import ReactGA from 'react-ga';
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

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

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
            <Route exact path="/event" render={() => <Redirect to="/"/>} />
            {/* View route for legacy events */}
            <Route path="/view" render={
              params => {
                let id = params.location.search.split('=')[1];
                return <Redirect to={`/event/${id}`} />
              } 
            }/>
            <Route path="/event/:eventId" component={ViewEvent} />
          </Provider>
        </Router>
    );
  }
}

export default App;
