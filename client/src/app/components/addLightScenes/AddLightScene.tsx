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
import { SwatchesPicker } from 'react-color';

interface ILightScenesProps {
  clientStore: ClientStore,
}

interface ILightSceneState {
  showModal: boolean,
  lightToEdit: any,
  selectedColor: any,
}

@observer
export class AddLightScene extends React.Component<ILightScenesProps, ILightSceneState> {

  state = {
    showModal: false,
    lightToEdit: SceneLight,
    selectedColor: { hex: '' },
  };

  handleOk() {
    this.props.clientStore.setLightColor(this.state.lightToEdit, this.state.selectedColor)
    this.setState({ 'showModal': false })
  }

  handleCancel() {
    this.setState({ 'showModal': false })
  }

  handleCustomizeClick(light: SceneLight) {
    this.setState({ 'showModal': true, 'lightToEdit': light });
  }

  handleChangeComplete = (color: any) => {
    this.setState({ selectedColor: color })
  };

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
                  avatar={ <Avatar style={ { backgroundColor: light.hex || 'grey' } } icon="bulb"/> }
                  title={ light.displayableName }
                  description={ light.name }/>
              </List.Item>) }/>

      <Modal title={ `Customize light ${this.state.lightToEdit.name}` }
             style={ { backgroundColor: this.state.selectedColor.hex } }
             visible={ this.state.showModal }
             onOk={ () => this.handleOk() }
             onCancel={ () => this.handleCancel() }>
        <SwatchesPicker
          onChangeComplete={ this.handleChangeComplete }
        />
      </Modal>
    </div>
  }
}

export default AddLightScene;