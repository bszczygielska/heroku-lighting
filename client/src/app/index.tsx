import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Router, Route, Switch, Redirect } from 'react-router';
import { Provider } from 'mobx-react';
import Dashboard from './components/dashboard';
import AddLightScene from './components/addLightScenes';
import LightScenes from './components/lightScenes';
import { LightManager } from './components/manager';
import { Root } from './components/root';
import { ClientStore } from './stores/ClientStore';

require('babel-core/register');

const clientStore = new ClientStore();
const history = createBrowserHistory();

const rootStores = {
  clientStore: clientStore,
  history: history,
};

//test

ReactDOM.render(
  <Root stores={ rootStores }>
    <Router history={ rootStores.history }>
      <Provider { ...rootStores }>
        <Switch>
          <Route exact path="/" component={ Dashboard }/>
          <Route path="/addlightscenes" component={ AddLightScene }/>
          <Route path="/lightscenes" component={ LightScenes }/>
          <Route path="/lightsmanager" component={ LightManager }/>
          <Redirect to={'/'}/>
        </Switch>
      </Provider>
    </Router>
  </Root>,
  document.getElementById('root'),
)