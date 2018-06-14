import Card from 'antd/lib/card';
import Modal from 'antd/lib/modal/Modal';
import * as React from 'react';
import { observer } from 'mobx-react';
//import List from 'antd/es/list';
import Icon from 'antd/es/icon';
//import LightBulb from '../../models/LightBulb';
import ClientStore from '../../stores/ClientStore';
import { AddLightBulbForm } from './AddLightBulb';
import { Button } from 'antd';

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

  render() {

    const { clientStore } = this.props;
    const { lightBulbs, projectName } = clientStore;
    console.log(clientStore.lightBulbs.map(l => l.name));
    return (
      <Card title={projectName} extra={[<Button onClick={() => this.onNewRoomSpaceHandler('blank')}>
        <Icon type="plus-circle-o"/>Inner room space</Button>,
        <Button onClick={() => this.onNewLightHandler('blank')}>
          <Icon type="plus-circle-o"/>New light</Button>]}>


        {lightBulbs && lightBulbs.map((light, idx) =>
          <Card title={light.name.split(':')[0]}
                extra={[<Button onClick={() => this.onNewRoomSpaceHandler(light.name)}>
                  <Icon type="plus-circle-o"/>Inner room space</Button>,
                  <Button onClick={() => this.onNewLightHandler(light.name)}>
                    <Icon type="plus-circle-o"/>New light</Button>]}
                key={`card_${idx}`}>

            {/*<List*/}
            {/*dataSource={ lightBulbs }*/}
            {/*renderItem={ (light: LightBulb) => (*/}
            {/*<List.Item key={ `k_${idx}` } actions={ [*/}
            {/*<Icon type="edit" onClick={ () => this.onEditHandler() }/>,*/}
            {/*<Icon type="close-circle-o" onClick={ () => this.onDeleteHandler() }/>,*/}
            {/*] }>*/}
            {/*<Icon type="bulb"/>*/}
            {/*{ light.name.split(':')[1] }*/}
            {/*</List.Item>) }*/}
            {/*/>*/}


          </Card>)}


        <Modal
          title="Add light to this room"
          visible={!!clientStore.forNewLight}
          onCancel={() => this.handleCancel()}>
          <AddLightBulbForm {...this.props} newRoom={false}/>
        </Modal>

        <Modal
          title="Add light in new room"
          visible={!!clientStore.forNewRoom}
          onCancel={() => this.handleCancel()}>
          <AddLightBulbForm {...this.props} newRoom={true}/>
        </Modal>
      </Card>
    )
  }
}

export default LightBulbsTable;