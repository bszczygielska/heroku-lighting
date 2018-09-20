import * as React from 'react';
import 'antd/dist/antd.less';
import ClientStore from '../../stores/ClientStore';
import LightSceneEdit from '../addLightScenes/AddLightScene';
import { inject, observer } from 'mobx-react';
import LightScene from "../../models/LightScene";
import { List, Icon, Row, Col } from "antd/lib";
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
    sceneToDelete: null as any,
    sceneToEdit: null as any,
  };

  componentDidMount() {
    this.props.clientStore.fetchScenes()
  }

  handleDelete() {
    this.props.clientStore.onDeleteScene(this.state.sceneToDelete)
      .then(() => this.setState({ 'sceneToDelete': null }))
      .catch((e) => console.warn(e.message))
  }

  handleCancel() {
    this.setState({ showModal: false })
  }

  handleEditClick(scene: LightScene) {
    this.props.clientStore.setSceneToEdit(scene);
    this.setState({sceneToEdit: scene})
  }

  handleDeleteClick(scene: LightScene) {
    this.setState({ sceneToDelete: scene })
  }

  render() {
    const { clientStore } = this.props;
    const { lightScenes } = clientStore;

    return <div>
      <Card title={'Your light scenes'} bordered={false}>
        <Row gutter={16}>
          <Col span={12}>
      <List
        header={<div>Choose light scene to configure</div>}
        bordered
        dataSource={lightScenes}
        pagination={{ pageSize: 10 }}
        renderItem={(scene: LightScene) => (

          <List.Item actions={[
            <Icon type="plus-circle-o" onClick={() => this.handleEditClick(scene)}/>,
            <Icon type="minus-circle-o" onClick={() => this.handleDeleteClick(scene)}/>,
          ]}>

            <List.Item.Meta
              title={scene.name}
              description={scene.sceneLights.map(l => l.name).join(', ')}/>


          </List.Item>)}/>
          </Col>
          <Col span = {12}>
            <LightSceneEdit { ...this.props } sceneToEdit={this.state.sceneToEdit}/>
          </Col>
        </Row>
      </Card>
      <Modal title="Delete scene"
             visible={!!this.state.sceneToDelete}
             onOk={() => this.handleDelete()}
             onCancel={() => this.handleCancel()}>
        Are you sure you want to delete scene {this.state.sceneToDelete && this.state.sceneToDelete.name.toUpperCase()}
      </Modal>
    </div>
  }
}

export default LightScenes;