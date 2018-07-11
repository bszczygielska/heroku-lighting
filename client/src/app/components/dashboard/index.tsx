import * as React from 'react';
import 'antd/dist/antd.less';
import ClientStore from '../../stores/ClientStore';
import { Card } from 'antd';
import { LightBulbsTable } from './LightBulbsTable'
import { inject, observer } from 'mobx-react';

interface IAppProps {
  form: any,
  clientStore: ClientStore,
}

@inject('clientStore')
@observer
export class Dashboard extends React.Component<IAppProps, any> {

  componentDidMount() {
    this.props.clientStore.fetchLights();
  }

  render() {
    return (
      <div style={{ padding: '30px' }}>
        <Card title={'Here you can add lights and inner spaces to your project'} bordered={false}>
          <LightBulbsTable {...this.props}/>
        </Card>
      </div>
    );
  }
}

export default Dashboard;