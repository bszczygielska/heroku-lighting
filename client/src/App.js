import React, { Component } from "react";
import io from "socket.io-client";
import 'antd/dist/antd.css';
import { Button } from 'antd';


const socket = io('http://localhost:5000')

class App extends Component {

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
      <div style={{ textAlign: "center" }}>
        <Button type="primary" onClick={this.buttonClickedHandler}>Send</Button>
      </div>
    );
  }
}

export default App;