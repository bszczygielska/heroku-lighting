import * as React from 'react';
import 'antd/dist/antd.less';
import List from 'antd/lib/list';
import ClientStore from '../../stores/ClientStore';
import { observer } from 'mobx-react';
import LightBulb from "../../models/LightBulb";
import AddSceneNameForm from "./AddSceneName";
import Avatar from "antd/es/avatar";
import { Modal } from "antd/lib";

interface ILightScenesProps {
  clientStore: ClientStore,
}

@observer
export class LightSceneEdit extends React.Component<ILightScenesProps, any> {

  state = {
  showModal: false
  }

  handleOk(){
    this.setState({'showModal': false})
  }

  handleCancel() {
    this.setState({'showModal': false})
  }

  render() {
    const { clientStore } = this.props;
    const { lightsToScene } = clientStore;


  return <div>
    <List
    header={<AddSceneNameForm {...this.props}/>}
    bordered
    dataSource={lightsToScene}
    pagination={{ pageSize: 10 }}
    renderItem={(light: LightBulb) => (
      <List.Item actions={[
        <div onClick={() => this.setState({'showModal': true})}>customize</div>,
      ]}>
        <List.Item.Meta
          avatar={<Avatar style={{ backgroundColor: 'grey' }} icon="bulb" />}
          title={light.displayableName}
          description={light.name}/>
      </List.Item>)}
  />
    <Modal
      title="Basic Modal"
      visible={this.state.showModal}
      onOk={() => this.handleOk()}
      onCancel={() => this.handleCancel()}
    >
      Wybieranie koloru
    </Modal>
  </div>
  }
}

export default LightSceneEdit;