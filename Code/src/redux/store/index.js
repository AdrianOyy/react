import { createStore } from 'redux'
import rootReducer from '../reducers/index'
import { getUserFromLocalStorage } from "../../utils/auth"

const loadState = () => {
  const user = getUserFromLocalStorage()
  return {
    userReducer: { currentUser: user ? user : {} }
  }
}

const store = createStore(rootReducer, loadState())

export default store
