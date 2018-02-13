import React, {Component} from "react";
import io from "socket.io-client";
import 'antd/dist/antd.less';

import {Button, Card} from 'antd';
import {AddLightBulb} from "./components/AddLightBulb"

const socket = io('http://localhost:5000')

export class App extends Component {

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
            <AddLightBulb/>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;