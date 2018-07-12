import * as React from 'react';
import 'antd/dist/antd.less';
import ClientStore from '../../stores/ClientStore';
import { Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';

interface ILightScenesProps {
  form: any,
  clientStore: ClientStore,
}

@inject('clientStore')
@observer
export class LightManager extends React.Component<ILightScenesProps, any> {

  componentWillMount() {
  }

  componentDidMount() {

  }

  render() {
    const { clientStore } = this.props;

    return (
      <Card title="Lights Manager" bordered={ false }>
        { clientStore.lightScenes.map((scene, idx) => {
          return (<div>
              Turn on
              <Button>{ scene.name }</Button>
            </div>
          )
        }) }
      </Card>
    );
  }
}

export default LightManager;