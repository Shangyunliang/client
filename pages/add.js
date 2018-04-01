import Router from 'next/router'
import App from '../index'
import React, {Component} from 'react'
import axios from 'axios'
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Breadcrumb, Modal, Input, message
} from 'antd';
import InputList from '../components/InputList'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

// const host = 'http://127.0.0.1:7001'
const host = 'http://www.ethanfun.club:7001'

@Form.create()
export default class Add extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    companypics: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  bread = [
    <Breadcrumb.Item key={1}>菜单</Breadcrumb.Item>,
    <Breadcrumb.Item key={2}>添加职位</Breadcrumb.Item>,
  ]

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.companypics = values.companypics.map(item => item.name)
        const res = await axios.post(`${host}/job/add`, values, {
          headers: {'x-csrf-token': this.getCsrf()}
        })
        console.log(res)
        if(res.status == 200) {
          message.success(res.statusText, 2, () => {
            Router.push('/')
          })
        }
        // const data = await res.json()
        // console.log(`Show data fetched. Count: ${data.length}`)
      }
    });
  }

  getCsrf = () => {
    if(typeof window !== 'undefined') {
      let keyValue = document.cookie.match('(^|;) ?csrfToken=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : null;
    }
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ companypics: fileList })

  handleCancel = () => this.setState({ previewVisible: false })

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { previewVisible, previewImage, companypics } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <App breadcrumbs={this.bread}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="公司名称"
          >
            {getFieldDecorator('companyname', {
              rules: [{
                required: true, message: '公司名称相当当, 怎么可以不填写呢 😈',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input placeholder="请输入公司名称" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="公司简介"
          >
            {getFieldDecorator('companyinfo', {
              rules: [{
                required: true, message: '公司发展PPT,  🍰福利都来晒一晒吧',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <TextArea placeholder="请输入公司简介" autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="职位名称"
          >
            {getFieldDecorator('jobname', {
              rules: [{
                required: true, message: '👨‍💻 必须要有名分啊',
              }],
            })(
              <Input placeholder="请输入职位名称" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="职位薪资范围"
          >
            {getFieldDecorator('jobsalary', {
              initialValue: [8, 20],
              rules: [{
                required: true, message: '这才是最重要的 💰',
              }],
            })(
              <Slider range marks={{ 0: '0', 10: '10', 15: '15', 20: '20', 40: '40', 60: '60', 80: '80', 100: '100' }} />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="职位要求"
          >
            {getFieldDecorator('jobrequire', {
              rules: [{
                required: true, message: '有能力才对得起 这么高的薪资啊 😉',
              }],
            })(
              <InputList />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="请上传公司环境照"
          >
            <div className="dropbox">
              {getFieldDecorator('companypics', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [{
                  required: true, message: '是老北京四合院, 还是高大上的写字楼都来晒一晒吧~',
                }]
              })(
                <Upload
                  action={`${host}/upload`}
                  listType="picture-card"
                  name={'file'}
                  headers={{
                    'x-csrf-token': this.getCsrf()
                  }}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {companypics.length >= 5 ? null : uploadButton}
                </Upload>
              )}
            </div>
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </App>)
  }
}