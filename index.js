import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
const { SubMenu } = Menu;
const { Header, Sider, Content, Footer } = Layout;
import './index.css'

class App extends React.Component {
  state = {
    collapsed: false,
    current: this.props.router.pathname,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <link rel='stylesheet' href='/_next/static/style.css' />
          </Head>
          <style jsx global>{`
        body {
        }
      `}</style>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="login" />
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['/']}
              selectedKeys={[this.state.current]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="/">
                <Link href="/">
                  <a>职位</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/add">
                <Link href="/add">
                  <a>添加职位</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/about">
                <Link href="/about">
                  <a>关于</a>
                </Link>
              </Menu.Item>
              {/*<Menu.Item key="/example">*/}
                {/*<Link href="/example">*/}
                  {/*<a>Example</a>*/}
                {/*</Link>*/}
              {/*</Menu.Item>*/}
            </Menu>
          </Header>
          <Layout>
            {/*<Sider*/}
              {/*trigger={null}*/}
              {/*collapsible*/}
              {/*collapsed={this.state.collapsed}*/}
            {/*>*/}
              {/*<Menu*/}
                {/*mode="inline"*/}
                {/*theme="dark"*/}
                {/*defaultSelectedKeys={['1']}*/}
                {/*defaultOpenKeys={['sub1']}*/}
                {/*style={{ height: '100%', borderRight: 0 }}*/}
              {/*>*/}
                {/*<SubMenu key="sub1" title={<span><Icon type="user" /><span>subnav 1</span></span>}>*/}
                  {/*<Menu.Item key="1">option1</Menu.Item>*/}
                  {/*<Menu.Item key="2">option2</Menu.Item>*/}
                  {/*<Menu.Item key="3">option3</Menu.Item>*/}
                  {/*<Menu.Item key="4">option4</Menu.Item>*/}
                {/*</SubMenu>*/}
                {/*<SubMenu key="sub2" title={<span><Icon type="laptop" /><span>subnav 2</span></span>}>*/}
                  {/*<Menu.Item key="5">option5</Menu.Item>*/}
                  {/*<Menu.Item key="6">option6</Menu.Item>*/}
                  {/*<Menu.Item key="7">option7</Menu.Item>*/}
                  {/*<Menu.Item key="8">option8</Menu.Item>*/}
                {/*</SubMenu>*/}
                {/*<SubMenu key="sub3" title={<span><Icon type="notification" /><span>subnav 3</span></span>}>*/}
                  {/*<Menu.Item key="9">option9</Menu.Item>*/}
                  {/*<Menu.Item key="10">option10</Menu.Item>*/}
                  {/*<Menu.Item key="11">option11</Menu.Item>*/}
                  {/*<Menu.Item key="12">option12</Menu.Item>*/}
                {/*</SubMenu>*/}
              {/*</Menu>*/}
            {/*</Sider>*/}
            <Layout style={{ padding: '0 24px 24px', height: 'calc(100vh - 65px)' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                {this.props.breadcrumbs || []}
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0,}}>
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App)