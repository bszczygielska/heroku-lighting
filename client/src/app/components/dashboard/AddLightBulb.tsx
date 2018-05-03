import * as React from "react";
import {Button, Input, Form} from 'antd';
import {ClientStore} from "../../stores/ClientStore";
import { observer } from 'mobx-react';

const FormItem = Form.Item;

interface IAddLightBulbProps {
  form: any;
  clientStore: ClientStore;
}

@observer
class AddLightBulb extends React.Component<IAddLightBulbProps, any> {

  private handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (err) {
        console.log(err.message)
      } else {
        console.log('robie bulba ', values.lightName, values.roomName)
        this.props.clientStore.addLight(values.lightName, values.roomName)
        //let newBulbList = this.props.clientStore.lightBulbs.concat( new LightBulb(values.lightName, values.roomName))
        //this.props.clientStore.setValue('lightBulbs', newBulbList);
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