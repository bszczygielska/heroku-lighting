import React, { Component } from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient('http://localhost:5000')

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    socket.on('fromClient', (msg) => { this.setState = ({ message: msg }) })
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        Message from client: {this.state.message}
      </div>
    );
  }
}

export default App;