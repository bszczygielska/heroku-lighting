import * as React from 'react';
import 'antd/dist/antd.less';
import LightScene from '../../models/LightScene';
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

  handleButtonClick(scene: LightScene) {
    console.log(scene)
    console.log('wysylam')
    this.props.clientStore.toggleScene(scene);
  }

  render() {
    const { clientStore } = this.props;

    return (
      <Card title="Lights Manager" bordered={ false }>
        { clientStore.lightScenes.map((scene, idx) => {
          return (<div key={ `${scene._id}_${idx}` }>
              { scene.state ? `Turn OFF ` : `Turn ON ` }
              <Button key={idx}
                      type={ scene.state ? 'primary' : 'default' }
                      onClick={ () => this.handleButtonClick(scene) }>{ scene.name }</Button>
            </div>
          )
        }) }
      </Card>
    );
  }
}

export default LightManager;