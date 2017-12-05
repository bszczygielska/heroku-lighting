import React, { Component } from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient('http://localhost:5000')

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  componentDidMount = () => {
    socket.on('toSimulation', (message) => {
      alert(message);
      this.setState = ({ text: message })
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