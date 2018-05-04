import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Modal from 'antd/lib/modal/Modal';
import * as React from 'react';
import { observer } from 'mobx-react';
import List from 'antd/es/list';
import Icon from 'antd/es/icon';
import LightBulb from '../../models/LightBulb';
import ClientStore from '../../stores/ClientStore';
import { AddLightBulbForm } from './AddLightBulb';

interface ILightsTableProps {
  form: any;
  clientStore: ClientStore;
}

@observer
export class LightBulbsTable extends React.Component<ILightsTableProps, any> {

  onEditHandler() {
  }

  onDeleteHandler() {
  }

  onNewLightHandler() {
    this.props.clientStore.setValue('showNewLightModal', true)
  }

  onNewRoomSpaceHandler() {
    this.props.clientStore.setValue('storedRoomName', 'sth')
  }

  handleOk() {
    this.props.clientStore.setValue('showNewLightModal', false)
    this.props.clientStore.setValue('storedRoomName', '')
  }

  handleCancel() {
    this.props.clientStore.setValue('showNewLightModal', false)
    this.props.clientStore.setValue('storedRoomName', '')
  }

  render() {

    const { lightBulbs } = this.props.clientStore;

    return (lightBulbs && lightBulbs.map((light, idx) =>
        <Card title={ light.group.split(':')[0] }
              extra={ [<Button onClick={ () => this.onNewRoomSpaceHandler() }>
                <Icon type="plus-circle-o"/>Inner room space</Button>,
                <Button onClick={ () => this.onNewLightHandler() }>
                  <Icon type="plus-circle-o"/>New light</Button>] }
              key={ idx }>

          <Modal
            title="add light to this room"
            visible={ this.props.clientStore.showNewLightModal }
            onOk={ () => this.handleOk() }
            onCancel={ () => this.handleCancel() }>
            <AddLightBulbForm noRoom={ true }{ ...this.props }/>
          </Modal>

          <Modal
            title="showNewRoomSpaceModal"
            visible={ this.props.clientStore.storedRoomName !== '' }
            onOk={ () => this.handleOk() }
            onCancel={ () => this.handleCancel() }>
            <AddLightBulbForm { ...this.props } />
          </Modal>

          <List
            dataSource={ lightBulbs }
            renderItem={ (light: LightBulb) => (
              <List.Item actions={ [
                <Icon type="edit" onClick={ () => this.onEditHandler() }/>,
                <Icon type="close-circle-o" onClick={ () => this.onDeleteHandler() }/>,
              ] }>
                <Icon type="bulb"/>
                { light.group.split(':')[1] }
              </List.Item>) }
          />
        </Card>)
    );
  }
}

export default LightBulbsTable;