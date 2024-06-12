import { Component } from 'react'
import { Provider } from 'mobx-react'

import counterStore from './store/counter'
// 不需要更改主题，引用它
import '@antmjs/vantui/lib/index.css'
// 需要通过less变量/var()更改主题，引用它
import '@antmjs/vantui/lib/index.less'
import './app.scss'

const store = {
  counterStore
}

class App extends  Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
