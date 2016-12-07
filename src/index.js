import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './MainLayout';
import Home from './components/Home/index';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
), document.getElementById('main'));

