import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Sider, Footer } = Layout;

export class Root extends React.Component {

  render() {
    const { children } = this.props;
    return (
      <Layout className="layout">
        <Header style={{backgroundImage: "../264.jpg"}}/>
        <Layout>
          <Layout style={{ marginLeft: 200, height: '90%' }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial'}}>
              <Sider style={{ overflow: 'auto', height: 'auto', position: 'fixed', left: 0 }}>
                <Menu mode="inline" defaultSelectedKeys={['4']}>
                  <Menu.Item key="1">
                    <Icon type="user" />
                    <span className="nav-text">Configuration</span>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Icon type="bulb" />
                    <span className="nav-text">Light scenes</span>
                  </Menu.Item>
                </Menu>
              </Sider>
              <div style={{ padding: 24, background: '#fff'}}>
                {children}
              </div>
            </Content>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>

          </Footer>
        </Layout>
      </Layout>
    );
  }
};
