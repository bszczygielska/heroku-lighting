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


  decideWhatRender(obj: object, path: string): any {
    if (typeof obj !== 'object')
      return;
    let items = [];
    for (let key in obj) {
      let newPath = (path === 'blank') ? `${key}` : `${path}.${key}`;
      const item = (obj[key] instanceof LightBulb) ? this.renderLight(obj[key]) : this.renderRoom(key, obj[key], newPath)
      items.push(item);
    }
    return items;
  }

  renderLight(light: LightBulb) {
    return <List.Item key={`l_${light.name}`}
                      actions={[<Icon type="minus-circle-o" onClick={() => this.onDeleteHandler(light)}/>]}>
      <List.Item.Meta title={light.displayableName} description={light.name}/>
    </List.Item>
  }

  renderRoom(name: string, room: object, path: string) {
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
    return this.renderRoom('Your project', clientStore.coolObjectForRendering, 'blank')
  }
}


export default LightBulbsTable;