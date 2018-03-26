import * as React from "react";
import * as io from 'socket.io-client';
import 'antd/dist/antd.less';
import ClientStore from "./ClientStore";
import {Button, Card} from 'antd';
import {AddLightBulbForm} from "./components/AddLightBulb"

const socket = io('http://localhost:5000');

interface IAppProps {
  form: any,
  store: ClientStore,
}

export class App extends React.Component<IAppProps, any> {

  componentDidMount() {
    socket.on('hiFromServer', (message) => {
      console.log('Server says: ' + message);
    });
  }

  buttonClickedHandler = (e) => {
    e.preventDefault();
    socket.emit('fromClient', 'Hi simulation, seems that we are connected')
  };

  render() {
    return (
      <div style={{padding: '30px'}}>
        <div style={{padding: '30px'}}>
          <Card>
            Send message to simulation <Button type="primary" onClick={this.buttonClickedHandler}>Send</Button>
          </Card>
        </div>
        <div style={{padding: '30px'}}>
          <Card title="Add light bulb" bordered={false}>
            <AddLightBulbForm {...this.props} />
          </Card>
        </div>
      </div>
    );
  }
}

export default App;