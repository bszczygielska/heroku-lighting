import * as React from 'react';
import 'antd/dist/antd.less';
import ClientStore from '../../stores/ClientStore';
import { Card } from 'antd';
import { observer } from 'mobx-react';

interface ILightScenesProps {
  form: any,
  clientStore: ClientStore,
}

@observer
export class LightScenes extends React.Component<ILightScenesProps, any> {

  componentWillMount() {
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={ { padding: '30px' } }>

        <div style={ { padding: '30px' } }>
          <Card title="Manage light bulb scenes" bordered={ false }>
          </Card>
        </div>


      </div>
    );
  }
}

export default LightScenes;