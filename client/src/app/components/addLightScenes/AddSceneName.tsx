import * as React from 'react';
import { Button, Input, Form } from 'antd';
import { ClientStore } from '../../stores/ClientStore';
import { observer } from 'mobx-react';
import LightScene from "../../models/LightScene";

const FormItem = Form.Item;

interface IAddLightBulbProps {
  form: any;
  clientStore: ClientStore;
  sceneToEdit?: LightScene;
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
        this.props.sceneToEdit
        ? this.props.clientStore.updateLightScene(values.sceneName, this.props.sceneToEdit)
        : this.props.clientStore.addLightScene(values.sceneName);
      }
    });

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {clientStore, sceneToEdit} = this.props;
    return (
      <Form layout="inline" onSubmit={ this.handleSubmit }>
          <FormItem label="Scene name">
            { getFieldDecorator('sceneName', {
              rules: [{ required: true, message: 'Please input scene name!' }],
            })(<Input placeholder={ !!sceneToEdit ? sceneToEdit.name : "ex relaxing mood"}/>) }
          </FormItem>
        <FormItem>
          <Button type="primary"
                  disabled={clientStore.lightsToScene.length === 0 }
                  htmlType="submit">Save scene</Button>
        </FormItem>
      </Form>
    );
  }
}

const AddSceneNameForm = Form.create()(AddSceneName);
export default AddSceneNameForm;
