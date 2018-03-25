import * as React from "react";
import {Button, Input, Form} from 'antd';

const FormItem = Form.Item;

interface IAddLightBulbProps {
  form: any;
}

export class AddLightBulb extends React.Component<IAddLightBulbProps, any> {

    componentDidMount() {
        this.props.form.validateFields();
    }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>

        <FormItem label="Light name">
            {getFieldDecorator('lightName', {
                rules: [{ required: true, message: 'Please input light name!' }],
            })(
                <Input placeholder="Light Name" />
            )}
        </FormItem>

        <FormItem label="Room name">
            {getFieldDecorator('roomName', {
                rules: [{ required: false }],
            })(
                <Input placeholder="Room Name" />
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