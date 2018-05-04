import Icon from 'antd/lib/icon';
import List from 'antd/lib/list';
import * as React from 'react';
import 'antd/dist/antd.less';
import LightBulb from '../../models/LightBulb';
import ClientStore from '../../stores/ClientStore';
import { Card } from 'antd';
import { inject, observer } from 'mobx-react';
import LightSceneEdit from './LightSceneEdit';

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
    const { lightBulbs } = clientStore;

    return (
      <div style={ { padding: '30px' } }>
        <Card title="Manage light bulb scenes" bordered={ false }>
          <List
            header={ <div>Choose bulbs for light scene</div> }
            bordered
            dataSource={ lightBulbs }
            renderItem={ (light: LightBulb) => (
              <List.Item actions={ [
                <Icon type="plus-circle-o" onClick={ () => clientStore.onChooseLightToScene }/>,
              ] }>
                <List.Item.Meta
                  avatar={ <Icon type="bulb"/> }
                />
                { light.group }
              </List.Item>) }
          />
          <LightSceneEdit {...this.props}/>

        </Card>
      </div>
    );
  }
}

export default LightScenes;