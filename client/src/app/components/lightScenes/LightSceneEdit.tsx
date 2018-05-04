import Table from 'antd/lib/table/Table';
import * as React from 'react';
import 'antd/dist/antd.less';
import ClientStore from '../../stores/ClientStore';
import { observer } from 'mobx-react';

interface ILightScenesProps {
  clientStore: ClientStore,
}

@observer
export class LightSceneEdit extends React.Component<ILightScenesProps, any> {

  componentWillMount() {
  }

  componentDidMount() {

  }

  render() {

    const { clientStore } = this.props;
    const { lightsToScene } = clientStore;

    const columns = [{
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
    }, {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    }];


    return (<Table columns={ columns } dataSource = { lightsToScene } />

  );
  }
}

export default LightSceneEdit;