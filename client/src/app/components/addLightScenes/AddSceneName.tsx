import * as React from 'react';
import { Button, Input, Form } from 'antd';
import { ClientStore } from '../../stores/ClientStore';
import { observer } from 'mobx-react';

const FormItem = Form.Item;

interface IAddLightBulbProps {
  form: any;
  clientStore: ClientStore;
}

@observer
class AddSceneName extends React.Component<IAddLightBulbProps, any> {

  private handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (err) {
        console.log(err.message)
      }
      else {
        this.props.clientStore.addLightScene(values.sceneName);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={ this.handleSubmit }>
          <FormItem label="Scene name">
            { getFieldDecorator('sceneName', {
              rules: [{ required: true, message: 'Please input scene name!' }],
            })(<Input placeholder="ex relaxing mood"/>) }
          </FormItem>
        <FormItem>
          <Button type="primary"
                  htmlType="submit">Save scene</Button>
        </FormItem>
      </Form>

    );
  }
}

const AddSceneNameForm = Form.create()(AddSceneName);
export default AddSceneNameForm;
