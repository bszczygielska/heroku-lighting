import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import {Router, Route, Switch} from 'react-router';
import {Provider} from "mobx-react";
import {createBrowserHistory} from 'history';

import {Root} from './components/root/index';
import {Dashboard} from "./components/dashboard/index";

import ClientStore from "./stores/ClientStore";

require("babel-core/register");

const history = createBrowserHistory();
const clientStore = new ClientStore();

ReactDOM.render(
  <Provider {...clientStore} >
  <Root>
    <Router history={history}>
      <Switch>
        <Route path="/" component={Dashboard}/>
      </Switch>
    </Router>
  </Root>
  </Provider>,
  document.getElementById('root')
);