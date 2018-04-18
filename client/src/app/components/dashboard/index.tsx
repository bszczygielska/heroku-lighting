import * as React from 'react';
import * as io from 'socket.io-client';
import 'antd/dist/antd.less';
import ClientStore from '../../stores/ClientStore';
import { Button, Card } from 'antd';
import { AddLightBulbForm } from './AddLightBulb'
import { LightBulbsTable } from './LightBulbsTable'
import { inject, observer } from 'mobx-react';

const socket = io('http://localhost:5000');

interface IAppProps {
  form: any,
  clientStore: ClientStore,
}

@inject('clientStore')
@observer
export class Dashboard extends React.Component<IAppProps, any> {

  componentWillMount() {
    //this.props.store.fetchLights();
  }

  componentDidMount() {
    socket.on('hiFromServer', (message: any) => {
      console.log('Server says: ' + message);
    });
  }

  buttonClickedHandler = (e: any) => {
    e.preventDefault();
    socket.emit('fromClient', 'Hi simulation, seems that we are connected')
  };

  render() {
    return (
      <div style={ { padding: '30px' } }>
        <div style={ { padding: '30px' } }>
          <Card>
            Send message to simulation <Button type="primary" onClick={ this.buttonClickedHandler }>Send</Button>
          </Card>
        </div>
        <div style={ { padding: '30px' } }>
          <Card title="Add light bulb" bordered={ false }>
            <AddLightBulbForm { ...this.props } />
          </Card>
        </div>
        <div style={ { padding: '30px' } }>
          <LightBulbsTable { ...this.props }/>
        </div>
      </div>
    );
  }
}

export default Dashboard;