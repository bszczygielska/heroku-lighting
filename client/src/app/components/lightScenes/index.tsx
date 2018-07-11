import * as React from 'react';
import 'antd/dist/antd.less';
import ClientStore from '../../stores/ClientStore';
import { inject, observer } from 'mobx-react';
import LightScene from "../../models/LightScene";
import { List, Icon } from "antd/lib";
import Modal from "antd/lib/modal/Modal";
import Card from "antd/lib/card";

interface ILightScenesProps {
  form: any,
  clientStore: ClientStore,
}

@inject('clientStore')
@observer
export class LightScenes extends React.Component<ILightScenesProps, any> {

  state = {
    showModal: false,
  };

  componentDidMount() {
    this.props.clientStore.fetchScenes()
  }

  handleOk(scene: LightScene) {
    this.props.clientStore.onDeleteScene(scene)
      .then(() => this.setState({ 'showModal': false }))
      .catch((e) => console.warn(e.message))
  }

  handleCancel() {
    this.setState({ 'showModal': false })
  }

  handleDeleteClick(scene: LightScene) {
    this.setState({ 'showModal': true })
  }

  render() {
    const { clientStore } = this.props;
    const { lightScenes } = clientStore;

    return <div>
      <Card title={'Your light scenes'} bordered={false}>
      <List
        header={<div>Choose light scene to configure</div>}
        bordered
        dataSource={lightScenes}
        pagination={{ pageSize: 10 }}
        renderItem={(scene: LightScene) => (
          <List.Item actions={[
            <Icon type="minus-circle-o" onClick={() => this.handleDeleteClick(scene)}/>,
          ]}>

            <List.Item.Meta
              title={scene.name}
              description={scene.sceneLights.map(l => l.name).join(', ')}/>

            <Modal title="Basic Modal"
                   visible={this.state.showModal}
                   onOk={() => this.handleOk(scene)}
                   onCancel={() => this.handleCancel()}>
              Are you sure you want to delete scene {scene.name.toUpperCase()}
            </Modal>

          </List.Item>)}/>
      </Card>
    </div>
  }
}

export default LightScenes;