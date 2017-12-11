import React from "react";
import { Button, Form } from 'antd';

export class LightBulb extends React.Component {

  handleSubmit() {
    console.log('turn on/off')
  }

    render() {
      return (
          <Form onSubmit={this.handleSubmit()}>

          </Form>
      );
    }
  }

  export default LightBulb;