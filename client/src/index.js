import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import { Root } from './root';
import { App } from './App';

import "antd/dist/antd.css";
require("babel-core/register");

const history = createBrowserHistory();

ReactDOM.render(
    <Root>
      <Router history={history} >
        <Switch>
          <Route path="/" component={ App } />
        </Switch>
      </Router>
    </Root>,
  document.getElementById('root')
);