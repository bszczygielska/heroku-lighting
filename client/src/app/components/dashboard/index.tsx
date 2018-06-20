import * as React from 'react';
import 'antd/dist/antd.less';
import ClientStore from '../../stores/ClientStore';
import { Card } from 'antd';
import { AddProjectNameForm } from './AddProjectName';
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
    const { projectName } = this.props.clientStore;
    return (
      <div style={{ padding: '30px' }}>
        {!projectName
          ? <Card title={'Define most outer space for your project'} bordered={false}>
            <AddProjectNameForm {...this.props}/>
          </Card>
          : <Card title={'Here you can add lights and inner spaces to your project'} bordered={false}>
            <LightBulbsTable {...this.props}/>
          </Card>}
      </div>
    );
  }
}

export default Dashboard;