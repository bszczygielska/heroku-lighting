import React from "react";
import {Button, Input, Form} from 'antd';

const FormItem = Form.Item;

export class AddLightBulb extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    console.log('Add room to some array of rooms, ' +
      'then render it as a card with possibility ' +
      'of adding lightbulbs with names and labels for being groups ')
  }

  render() {

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>

        <FormItem label="Light name" >
          <Input placeholder="lihgtName"/>
        </FormItem>

        <FormItem label="Room name" >
          <Input placeholder="roomName"/>
        </FormItem>

        <FormItem>
          <Button type="primary"
                  htmlType="submit">Submit</Button>
        </FormItem>

      </Form>

    );
  }
}

export default AddLightBulb;