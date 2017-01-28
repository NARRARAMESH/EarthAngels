import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';
import App from './App';
import Feed from './components/feed.js';
import Events from './components/events.js';
import EventFull from './components/eventFull.js';
import './index.css';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Feed} />
      <Route path="/feedofKindness" component={Feed} />
      <Route path="/events" component={Events} />
      <Route path="/events/:eventFull" component={EventFull} />
    </Route>
  </Router>,
  document.getElementById('root')
);
