import Icon from 'antd/lib/icon';
import List from 'antd/lib/list';
import * as React from 'react';
import 'antd/dist/antd.less';
import LightBulb from '../../models/LightBulb';
import ClientStore from '../../stores/ClientStore';
import { Card, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';
import LightSceneEdit from './AddLightScene';

interface ILightScenesProps {
  form: any,
  clientStore: ClientStore,
}

@inject('clientStore')
@observer
export class AddLightScene extends React.Component<ILightScenesProps, any> {

  componentWillMount() {
  }

  componentDidMount() {

  }

  render() {
    const { clientStore } = this.props;
    const { lightBulbs } = clientStore;

    return (
      <Card title="Light scenes creator" bordered={ false }>
        <Row gutter={ 16 }>
          <Col span={ 12 }>
            <List
              header={ <div>Choose bulbs for light scene</div> }
              bordered
              dataSource={ lightBulbs }
              pagination={ { pageSize: 10 } }
              renderItem={ (light: LightBulb) => (
                <List.Item actions={ [
                  <Icon type="plus-circle-o" onClick={ () => clientStore.onChooseLightToScene(light) }/>,
                ] }>
                  <List.Item.Meta
                    title={ light.displayableName }
                    description={ light.name }/>
                </List.Item>) }
            />
          </Col>
          <Col span={ 12 }>
            <LightSceneEdit { ...this.props }/>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default AddLightScene;