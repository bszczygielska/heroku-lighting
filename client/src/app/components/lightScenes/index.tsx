import * as React from 'react';
import 'antd/dist/antd.less';
import ClientStore from '../../stores/ClientStore';
import { Card } from 'antd';
import { inject, observer } from 'mobx-react';

interface ILightScenesProps {
  form: any,
  clientStore: ClientStore,
}

@inject('clientStore')
@observer
export class LightScenes extends React.Component<ILightScenesProps, any> {

  componentWillMount() {
  }

  componentDidMount() {

  }

  render() {
    const { clientStore } = this.props;

    return (
      <div style={{ padding: '30px' }}>
        <Card title="Manage light bulb scenes" bordered={false}>
          {clientStore.lightScenes.map( (scene, idx) => {
            return (
              <div key={`sc_${idx}`}>{JSON.stringify(scene)}</div>
          )
          })}

        </Card>
      </div>
    );
  }
}

export default LightScenes;