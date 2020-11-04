import { combineReducers } from 'redux'

import themeReducer from './themeReducers'
import userReducer from './userReducers'
import pageReducer from './pageReducers'

export default combineReducers({
  themeReducer,
  userReducer,
  pageReducer,
})
