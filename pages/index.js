import App from '../index'
import React, {Component} from 'react'
import { Breadcrumb, List, Avatar, Icon, Modal, Button, Row, Col, Spin, message } from 'antd';
import axios from 'axios'

// const host = 'http://127.0.0.1:7001'
const host = 'http://www.ethanfun.club:7001'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class Home extends Component {
  static async getInitialProps(){
    const res = await axios.get(`${host}/job`)
    return {
      listData: res.data
    }
  }

  state = {
    previewVisible: false,
    previewImage: '',
    listData: this.props.listData || [],
    loading: false,
    loadingMore: false,
    showLoadingMore: true,
    page: 1,
  };

  bread = [
    <Breadcrumb.Item key={1}>菜单</Breadcrumb.Item>,
    <Breadcrumb.Item key={2}>职位</Breadcrumb.Item>,
  ]

  componentDidMount() {
    // console.log(this.props)
    // axios.get(`${host}/job`,{
    //   headers: {'x-csrf-token': this.getCsrf()}
    // })
    //   .then(res => {console.log(res.data)})
  }

  getCsrf = () => {
    if(typeof window !== 'undefined') {
      let keyValue = document.cookie.match('(^|;) ?csrfToken=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : null;
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => () => {
    this.setState({
      previewImages: file,
      previewImage: file[0],
      previewImageIndex: 0,
      previewVisible: true,
    });
  }

  right = () => {
    const {previewImageIndex, previewImages} = this.state
    if(previewImageIndex == previewImages.length - 1) {
      return
    }
    this.setState({
      previewImageIndex: previewImageIndex + 1,
      previewImage: previewImages[previewImageIndex + 1],
    })
    console.log('left', this.state)
  }

  left = () => {
    const {previewImageIndex, previewImages} = this.state
    if(previewImageIndex == 0) {
      return
    }
    this.setState({
      previewImageIndex: previewImageIndex - 1,
      previewImage: previewImages[previewImageIndex - 1],
    })
    console.log('right', this.state)
  }

  onLoadMore = async () => {
    await this.setState({ loadingMore: true});
    const res = await axios.get(`${host}/job`, {params: {page: this.state.page + 1}})
    if(res.data.length == 0) {
      message.warning('没有更多数据了', 2, () => {
        this.setState({
          loadingMore: false,
        })
      })
      return
    }
    const data = this.state.listData.concat(res.data);
    this.setState({
      listData: data,
      loadingMore: false,
      page: this.state.page + 1,
    }, () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  }

  render() {
    const { previewVisible, previewImage } = this.state;
    const { loading, loadingMore, showLoadingMore, listData } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore} icon={'arrow-down'} type={'primary'}>加载更多...</Button>}
      </div>
    ) : null;

    return(
      <App breadcrumbs = {this.bread}>
        <List
          itemLayout="vertical"
          size="large"
          loading={loading}
          loadMore={loadMore}
          dataSource={listData}
          renderItem={(item, index) => {
            const title = `${item.jobname}    ${item.companyname}   ${item.jobsalary[0]}k - ${item.jobsalary[1]}k`
            return (
              <List.Item
                key={index}
                actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                extra={<img width={272} alt="logo" src={`${host}/public/${item.companypics[0]}`} onClick={this.handlePreview(item.companypics)}/>}
              >
                <div className={"ant-list-item-content ant-list-item-content-single"}>
                  <List.Item.Meta
                    avatar={<Avatar src={`${host}/public/${item.companypics[0]}`} />}
                    title={<a href={item.companyname}>{title}</a>}
                    description={item.companyinfo}
                  />
                  {item.jobrequire && item.jobrequire.length != 0 ?
                  <ol>
                    {item.jobrequire.map((item, key) => <li key={key}>{item}</li>)}
                  </ol>: null}
                </div>
              </List.Item>
            )}}
        />
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} width={1000}>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={2}>
              <Button type="primary" shape="circle" icon="arrow-left" size={'large'} onClick={this.left}/>
            </Col>
            <Col span={12}>
              <img alt="example" style={{ width: '100%' }} src={`${host}/public/${previewImage}`} />
            </Col>
            <Col span={2}>
              <Button type="primary" shape="circle" icon="arrow-right" size={'large'} style={{float: 'right'}} onClick={this.right}/>
            </Col>
          </Row>
        </Modal>
    </App>)
  }
}