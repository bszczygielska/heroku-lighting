import * as React from "react";
import {Button, Input, Form} from 'antd';
import {ClientStore} from "../../stores/ClientStore";
import { observer } from 'mobx-react';

const FormItem = Form.Item;

interface IAddLightBulbProps {
  form: any;
  clientStore: ClientStore;
  noRoom?: boolean;
}

@observer
class AddLightBulb extends React.Component<IAddLightBulbProps, any> {

  private handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (err) {
        console.log(err.message)
      } else {
        this.props.clientStore.addLight(values.lightName)
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
            initialValue: this.props.clientStore.storedRoomName,
            rules: [{required: this.props.noRoom}],
          })(
            !this.props.noRoom
              ? <Input placeholder="Room Name"/>
              : <Input placeholder={this.props.clientStore.storedRoomName} disabled={true}/>
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