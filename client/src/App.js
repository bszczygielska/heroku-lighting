import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: 'http://localhost:5000'
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
  }

  hiFromServerHandler = () => {
    this.socket.on("hiFromServer", () => this.setState({ response: 'hejka' }));
  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        { response }
      </div>
    );
  }
}

export default App;