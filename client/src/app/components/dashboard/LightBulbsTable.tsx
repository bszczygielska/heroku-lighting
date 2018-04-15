import * as React from "react";
import {observer} from 'mobx-react';
import List from "antd/es/list";
import Icon from "antd/es/icon";
import LightBulb from "../../models/LightBulb";
import ClientStore from "../../stores/ClientStore";

interface ILightsTableProps {
  form: any;
  store: ClientStore;
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
        dataSource={this.props.store.lightBulbs || new LightBulb('dummy', 'light')}
        renderItem={item => (
          <List.Item actions={[
            <Icon type="edit" onClick={this.onEditHandler}/>,
            <Icon type="close-circle-o" onClick={this.onDeleteHandler}/>
          ]}>
            <List.Item.Meta
              avatar={<Icon type="bulb"/>}
            />
            {item.name}
          </List.Item>)}
      />
    );
  }
}

export default LightBulbsTable;