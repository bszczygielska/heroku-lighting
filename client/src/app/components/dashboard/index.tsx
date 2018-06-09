import * as React from 'react';
import * as io from 'socket.io-client';
import 'antd/dist/antd.less';
import ClientStore from '../../stores/ClientStore';
import { Card } from 'antd';
import { AddProjectNameForm } from './AddProjectName';
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

  //buttonClickedHandler = (e: any) => {
  //  e.preventDefault();
  //  socket.emit('fromClient', 'Hi simulation, seems that we are connected')
  //};

  render() {
    const { projectName } = this.props.clientStore;
    return (
      <div style={ { padding: '30px' } }>
        <div style={ { padding: '30px' } }>
          { /*<Card>*/ }
          { /*Send message to simulation <Button type="primary" onClick={ this.buttonClickedHandler }>Send</Button>*/ }
          { /*</Card>*/ }
          <div style={ { padding: '30px' } }>


            { !projectName
              ? <Card title={ 'Define most outer space for your project' } bordered={ false }>
                <AddProjectNameForm { ...this.props }/>
              </Card>

              : <Card title={ 'Now you can add lights and inner spaces to your project' } bordered={ false }>
                <LightBulbsTable { ...this.props }/>
              </Card>}
          </div>
        </div>

      </div>
    );
  }
}

export default Dashboard;