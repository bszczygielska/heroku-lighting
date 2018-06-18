import Card from 'antd/lib/card';
import Modal from 'antd/lib/modal/Modal';
import * as React from 'react';
import { observer } from 'mobx-react';
import Icon from 'antd/es/icon';
import LightBulb from '../../models/LightBulb';
import ClientStore from '../../stores/ClientStore';
import { AddLightBulbForm } from './AddLightBulb';
import { Button } from 'antd';
import List from 'antd/lib/list';

interface ILightsTableProps {
  form: any;
  clientStore: ClientStore;
}

@observer
export class LightBulbsTable extends React.Component<ILightsTableProps, any> {

  onDeleteHandler(light: LightBulb) {
    this.props.clientStore.onDeleteLight(light)
  }

  onNewLightHandler(nameToStore: string) {
    this.props.clientStore.setValue('forNewLight', nameToStore)
  }

  onNewRoomSpaceHandler(nameToStore: string) {
    this.props.clientStore.setValue('forNewRoom', nameToStore)
  }

  handleCancel() {
    this.props.clientStore.setValue('forNewLight', '');
    this.props.clientStore.setValue('forNewRoom', '')
  }


  decideWhatRender(obj: object, path: string) {
    console.log('>> decide what render', obj, path);
    for (let key in obj) {
      let newPath = (path === 'blank') ? `${key}` : `${path}.${key}`;
      (obj[key] instanceof LightBulb) ? this.renderLight(obj[key]) : this.renderRoom(key, obj[key], newPath)
    }
  }

  renderLight(light: LightBulb) {
    console.log('---renderLight', light.displayableName);
    return <List.Item key={`l_${light.name}`}
                      actions={[<Icon type="minus-circle-o" onClick={() => this.onDeleteHandler(light)}/>]}>
      <List.Item.Meta title={light.displayableName} description={light.name}/>
    </List.Item>
  }

  renderRoom(name: string, room: object, path: string) {
    console.log('+++renderRoom', name, room, path);
    const { clientStore } = this.props;
    return <Card
      key={`room_${name}`}
      title={name}
      extra={[<Button onClick={() => this.onNewRoomSpaceHandler(path)}>
        <Icon type="plus-circle-o"/>Inner room space</Button>,
        <Button onClick={() => this.onNewLightHandler(path)}>
          <Icon type="plus-circle-o"/>New light</Button>]}>

      {this.decideWhatRender(room, path)}

      <Modal
        key={'light_modal'}
        title="Add light to this room"
        visible={!!clientStore.forNewLight}
        onCancel={() => this.handleCancel()}>
        <AddLightBulbForm {...this.props} newRoom={false}/>
      </Modal>

      <Modal
        key={'room_modal'}
        title="Add light in new room"
        visible={!!clientStore.forNewRoom}
        onCancel={() => this.handleCancel()}>
        <AddLightBulbForm {...this.props} newRoom={true}/>
      </Modal>
    </Card>
  }

  render() {
    const { clientStore } = this.props;
    const { projectName } = clientStore;
    return this.renderRoom(projectName, clientStore.coolObjectForRendering, 'blank')
  }
}


export default LightBulbsTable;