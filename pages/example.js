import App from '../index'
import React, {Component} from 'react'
import axios from 'axios'
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Breadcrumb, Modal
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const host = 'http://127.0.0.1:7001'

@Form.create()
export default class Example extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  getCsrf = () => {
    if(typeof window !== 'undefined') {
      let keyValue = document.cookie.match('(^|;) ?csrfToken=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : null;
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  bread = [
    <Breadcrumb.Item key={1}>Home</Breadcrumb.Item>,
    <Breadcrumb.Item key={2}>List</Breadcrumb.Item>,
    <Breadcrumb.Item key={3}>App</Breadcrumb.Item>,
  ]

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const res = await axios.get(host)
        console.log(res)
        // const data = await res.json()
        // console.log(`Show data fetched. Count: ${data.length}`)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <App  bread={this.bread}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Plain Text"
        >
          <span className="ant-form-text">China</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Select"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="use">U.S.A</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Select[multiple]"
        >
          {getFieldDecorator('select-multiple', {
            rules: [
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select favourite colors">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="InputNumber"
        >
          {getFieldDecorator('input-number', { initialValue: 3 })(
            <InputNumber min={1} max={10} />
          )}
          <span className="ant-form-text"> machines</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Switch"
        >
          {getFieldDecorator('switch', { valuePropName: 'checked' })(
            <Switch />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Slider"
        >
          {getFieldDecorator('slider')(
            <Slider marks={{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Radio.Group"
        >
          {getFieldDecorator('radio-group')(
            <RadioGroup>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Radio.Button"
        >
          {getFieldDecorator('radio-button')(
            <RadioGroup>
              <RadioButton value="a">item 1</RadioButton>
              <RadioButton value="b">item 2</RadioButton>
              <RadioButton value="c">item 3</RadioButton>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Rate"
        >
          {getFieldDecorator('rate', {
            initialValue: 3.5,
          })(
            <Rate />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Upload"
          extra="long"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              name="logo"
              action={`${host}/upload`}
              listType="picture"
              headers={{
                'x-csrf-token': this.getCsrf()
              }}
            >
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Dragger"
        >
          <div className="dropbox">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
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
                {fileList.length >= 3 ? null : uploadButton}
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
      </App>
    );
  }
}
