import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from './redux/store/index'
import getIEVersion from "./utils/ieVersion"

function start() {
  const IEVersion = getIEVersion()
  if (IEVersion !== -1) {
    alert("This platform is not support Internet Explorer, please change another modern browser to continue")
  } else {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>, document.getElementById('root'))
  }
}

start()
