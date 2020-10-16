import { combineReducers } from 'redux'

import themeReducer from './themeReducers'
import userReducer from './userReducers'

export default combineReducers({
  themeReducer,
  userReducer,
})
