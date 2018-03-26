import * as React from "react";
import {Button, Input, Form} from 'antd';
import {ClientStore} from "../ClientStore";

const FormItem = Form.Item;

interface IAddLightBulbProps {
  form: any;
  store: ClientStore;
}

export class AddLightBulb extends React.Component<IAddLightBulbProps, any> {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err.message)
      } else {
        this.props.store.addLight(values.lightName, values.roomName)
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>

        <FormItem label="Light name">
          {getFieldDecorator('lightName', {
            rules: [{required: true, message: 'Please input light name!'}],
          })(
            <Input placeholder="Light Name"/>
          )}
        </FormItem>

        <FormItem label="Room name">
          {getFieldDecorator('roomName', {
            rules: [{required: false}],
          })(
            <Input placeholder="Room Name"/>
          )}
        </FormItem>

        <FormItem>
          <Button type="primary"
                  htmlType="submit">Submit</Button>
        </FormItem>

      </Form>

    );
  }
}

export const AddLightBulbForm = Form.create()(AddLightBulb);