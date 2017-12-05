import React, { Component } from "react";
import io from "socket.io-client";

const socket = io('http://localhost:5000')

class App extends Component {

  componentDidMount() {
    socket.on('hiFromServer', (message) => { 
      alert('Server says: ' + message);
    });
  }

  buttonClickedHandler = (e) => {
    e.preventDefault();
    socket.emit('fromClient', 'Hi server how are you')
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={this.buttonClickedHandler}>Send</button>
      </div>
    );
  }
}

export default App;