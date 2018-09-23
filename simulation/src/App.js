import React from "react";
import * as io from 'socket.io-client';
import 'antd/dist/antd.css';
const socket = io('https://light-manager-client.herokuapp.com/socket');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  componentWillMount()  {
    socket.on('toSimulation', message => {
      this.setState({ text: message });
    })
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        Message from client: {this.state.text}
      </div>
    );
  }
}

export default App;