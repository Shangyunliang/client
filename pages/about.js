import App from '../index'
import React, {Component} from 'react'
import { Row, Col, Card, Breadcrumb } from 'antd';
const { Meta } = Card;

export default class About extends Component {
  bread = [
    <Breadcrumb.Item key={1}>菜单</Breadcrumb.Item>,
    <Breadcrumb.Item key={2}>关于</Breadcrumb.Item>,
  ]

  render() {
    return (
      <App breadcrumbs = {this.bread}>
        <Row type="flex" justify="center" align="middle">
          <Col span={16}>
            <h1 style={{textAlign: 'center'}}>您的支持, 是我继续收集信息的动力. 感谢 ~  </h1>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8} offset={4}>
            <Card
              hoverable
              style={{ width: 240, margin: '40px 0'}}
              cover={<img alt="example" style={{ width: 240 }} src="../static/weixin.jpg" />}
            >
              <Meta
                title="WeChat"
                description="支持人名单正在开发中..."
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240, margin: '40px 0'}}
              cover={<img alt="example" style={{ width: 240 }} src="../static/zhifubao.jpg" />}
            >
              <Meta
                title="Alipay"
                description="支持人名单正在开发中..."
              />
            </Card>
          </Col>
        </Row>
      </App>
    )
  }
}