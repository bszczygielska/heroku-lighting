import * as React from 'react';
import { Button, Input, Form } from 'antd';
import { ClientStore } from '../../stores/ClientStore';
import { observer } from 'mobx-react';

const FormItem = Form.Item;

interface IAddLightBulbProps {
  form: any;
  clientStore: ClientStore;
  firstLight?: boolean;
  newRoom: boolean;
}

@observer
class AddLightBulb extends React.Component<IAddLightBulbProps, any> {

  private handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (err) {
        console.log(err.message)
      }
      else {
          this.props.newRoom
          ? this.props.clientStore.addLightInNewRoom(values.roomName, values.lightName)
          : this.props.clientStore.addLightInCurrentRoom(values.lightName);
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <Form layout="inline" onSubmit={ this.handleSubmit }>
        { this.props.newRoom && <FormItem label="Room name">
          { getFieldDecorator('roomName', {
            rules: [{ required: true, message: 'Please input room name!' }],
          })(<Input placeholder="ex kitchen"/>) }
        </FormItem>
        }
        <FormItem label="Light name">
          { getFieldDecorator('lightName', {
            rules: [{ required: true, message: 'Please input light name!' }],
          })(<Input placeholder="Light Name"/>) }
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