import { createStore } from 'redux'
import rootReducer from '../reducers/index'
import { getUserFromLocalStorage } from "../../utils/auth"
import getCurrentPage from "../../utils/getCurrentPage"

const loadState = () => {
  const user = getUserFromLocalStorage()
  const { moduleName } = getCurrentPage()
  return {
    userReducer: { currentUser: user ? user : {} },
    pageReducer: { currentPage: { toListPage: moduleName === 'List' } },
  }
}

const store = createStore(rootReducer, loadState())

export default store
