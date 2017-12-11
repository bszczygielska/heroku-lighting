import React, {Component} from "react";
import io from "socket.io-client";
import 'antd/dist/antd.less';

import {Button, Card} from 'antd';
import {Room} from "./components/Room"


const socket = io('http://localhost:5000')

export class App extends Component {

  componentDidMount() {
    socket.on('hiFromServer', (message) => {
      alert('Server says: ' + message);
    });
  }

  buttonClickedHandler = (e) => {
    e.preventDefault();
    socket.emit('fromClient', 'Hi simulation, seems that we are connected')
  }

  render() {
    return (
      <div style={{padding: '30px'}}>
        <div style={{padding: '30px'}}>
        <Card>
            Send message to simulation <Button type="primary" onClick={this.buttonClickedHandler}>Send</Button>
        </Card>
        </div>
        <div style={{padding: '30px'}}>
          <Card title="Add rooms" bordered={false}>
            <Room/>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;