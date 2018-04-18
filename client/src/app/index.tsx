import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import Dashboard from './components/dashboard';
import LightScenes from './components/lightScenes';
import { Root } from './components/root';

import ClientStore from './stores/ClientStore';

require('babel-core/register');

const history = createBrowserHistory();
const clientStore = new ClientStore();

ReactDOM.render(
  <Root>
    <Router history={ history }>
      <Provider clientStore={ clientStore }>
        <Switch>
          <Route path="/" component={ Dashboard }/>
          <Route path="/lightScenes" component={ LightScenes }/>
        </Switch>
      </Provider>
    </Router>
  </Root>,
  document.getElementById('root'),
)