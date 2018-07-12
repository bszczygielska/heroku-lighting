import Icon from 'antd/lib/icon';
import * as React from 'react';
import 'antd/dist/antd.less';
import List from 'antd/lib/list';
import ClientStore from '../../stores/ClientStore';
import { observer } from 'mobx-react';
import AddSceneNameForm from './AddSceneName';
import Avatar from 'antd/es/avatar';
import { Modal } from 'antd/lib';
import SceneLight from '../../models/SceneLight';
import { SketchPicker } from 'react-color';

interface ILightScenesProps {
  clientStore: ClientStore,
}

@observer
export class AddLightScene extends React.Component<ILightScenesProps, any> {

  state = {
    showModal: false,
    lightToEdit: SceneLight,
  };

  handleOk() {
    this.setState({ 'showModal': false })
  }

  handleCancel() {
    this.setState({ 'showModal': false })
  }

  handleCustomizeClick(light: SceneLight) {
    this.setState({ 'showModal': true, 'lightToEdit': light });
  }

  render() {
    const { clientStore } = this.props;
    const { lightsToScene } = clientStore;

    return <div>
      <List header={ <AddSceneNameForm { ...this.props }/> }
            bordered
            dataSource={ lightsToScene }
            pagination={ { pageSize: 10 } }
            renderItem={ (light: SceneLight) => (
              <List.Item actions={ [
                <div onClick={ () => this.handleCustomizeClick(light) }>customize</div>,
                <Icon type="minus-circle-o" onClick={ () => clientStore.onDeleteLightToScene(light) }/>,
              ] }>
                <List.Item.Meta
                  avatar={ <Avatar style={ { backgroundColor: 'grey' } } icon="bulb"/> }
                  title={ light.displayableName }
                  description={ light.name }/>
              </List.Item>) }/>

      <Modal title="Basic Modal"
             visible={ this.state.showModal }
             onOk={ () => this.handleOk() }
             onCancel={ () => this.handleCancel() }>
        <SketchPicker/>
        Wybieranie koloru { this.state.lightToEdit.name }
      </Modal>
    </div>
  }
}

export default AddLightScene;