import React, { Component } from 'react'
import { Input, Button } from 'antd'

export default class InputList extends Component {

  constructor (props) {
    super(props)
    const value = this.props.value;
    this.state = {
      value: value,
      input: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  triggerAdd = () => {
    // Should provide an event to pass value to Form.
    if(!this.state.input) {
      return
    }

    this.setState({
      value: [...this.state.value || [], this.state.input],
      input: null,
    }, () => {
      const onChange = this.props.onChange;
      if (onChange) {
        onChange([...this.state.value]);
      }
    })
  }

  triggerDel = () => {
    this.setState({
      value: [...this.state.value.slice(0, this.state.value.length - 1)],
    }, () => {
      const onChange = this.props.onChange;
      if (onChange) {
        onChange([...this.state.value]);
      }
    })
  }

  handleNumberChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  render () {
    const { value } = this.state
    return (
      <div>
        {value && value.length != 0 ?
          <ol style={{ paddingLeft: '15px' }}>
          {this.state.value.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
          </ol> : null}
        <Input onChange={this.handleNumberChange} value={this.state.input} style={{marginRight: '10px'}}/>
        <Button onClick={this.triggerDel} style={{marginLeft: '10px', float: 'right'}}  type="danger">删除</Button>
        <Button onClick={this.triggerAdd} style={{marginLeft: '10px', float: 'right'}} type="primary">添加</Button>
      </div>
    )
  }
}

//