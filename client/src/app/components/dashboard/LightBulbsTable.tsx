import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Modal from 'antd/lib/modal/Modal';
import * as React from 'react';
import { observer } from 'mobx-react';
import List from 'antd/es/list';
import Icon from 'antd/es/icon';
import LightBulb from '../../models/LightBulb';
import ClientStore from '../../stores/ClientStore';

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
    this.props.clientStore.setValue('showNewRoomSpaceModal', true)
  }

  handleOk() {
    this.props.clientStore.setValue('showNewLightModal', false)
    console.log('asdsadas')
  }

  handleCancel() {
    this.props.clientStore.setValue('showNewRoomSpaceModal', false)
  }

  render() {

    const { lightBulbs } = this.props.clientStore;

    return (lightBulbs && lightBulbs.map((light, idx) =>
        <Card title={ light.group.split(':')[0] }
              extra={ <Button onClick={ () => this.onNewRoomSpaceHandler() }>
                <Icon type="plus-circle-o" />Inner room space</Button> }
              key={ idx }>

          <Button onClick={ () => this.onNewLightHandler() }>
            <Icon type="plus-circle-o" />New light</Button>

          <Modal
            title="showNewLightModal"
            visible={ this.props.clientStore.showNewLightModal }
            onOk={ () => this.handleOk() }
            onCancel={ () => this.handleCancel() }
          />

          <Modal
            title="showNewRoomSpaceModal"
            visible={ this.props.clientStore.showNewRoomSpaceModal }
            onOk={ () => this.handleOk() }
            onCancel={ () => this.handleCancel() }
          />
          <List
            dataSource={ lightBulbs }
            renderItem={ (light: LightBulb) => (
              <List.Item actions={ [
                <Icon type="edit" onClick={ this.onEditHandler }/>,
                <Icon type="close-circle-o" onClick={ this.onDeleteHandler }/>,
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