import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute} from 'react-router'
import App from './App';
import Login from './components/login.js';
import Feed from './components/feed.js';
import Events from './components/events.js';
import './index.css';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="/feedofKindness" component={Feed} />
      <Route path="/events" component={Events} />
    </Route>
  </Router>,
  document.getElementById('root')
);
