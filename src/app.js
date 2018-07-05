import React, { Component } from 'react'
import { Select, Input, Button } from 'antd'
const { Option } = Select

const methods = ['get', 'post', 'put', 'delete', 'option']

class App extends Component {
  state = {
    method: methods[0],
    url: '',
    headers: [],
    headersTempKey: '',
    headersTempValue: '',
  }

  render() {
    const { state } = this
    return (
      <div style={{ margin: 20 }}>
        <Select
          value={state.method}
          onChange={v => {
            this.setState({ method: v })
          }}
        >
          {methods.map(method => (
            <Option key={method} value={method}>
              {method}
            </Option>
          ))}
        </Select>
        <Input
          value={state.url}
          onChange={e => {
            this.setState({ url: e.target.value })
          }}
        />
        <Button>Add header</Button>
      </div>
    )
  }
}

export default App
