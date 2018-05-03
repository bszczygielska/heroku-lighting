import * as React from "react";
import { observer } from 'mobx-react';
import List from "antd/es/list";
import Icon from "antd/es/icon";
import LightBulb from '../../models/LightBulb';
import ClientStore from "../../stores/ClientStore";

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

  render() {
    return (
      <List
        header={<div>Manage your light bulbs</div>}
        bordered
        dataSource={this.props.clientStore.lightBulbs }
        renderItem={(light: LightBulb) => (
          <List.Item actions={[
            <Icon type="edit" onClick={this.onEditHandler}/>,
            <Icon type="close-circle-o" onClick={this.onDeleteHandler}/>
          ]}>
            <List.Item.Meta
              avatar={<Icon type="bulb"/>}
            />
            {light.name}
          </List.Item>)}
      />
    );
  }
}

export default LightBulbsTable;