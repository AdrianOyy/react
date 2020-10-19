import Loading from "../components/Loading"
import CommonTip from "../components/CommonTip"
import { L } from "./lang"
import store from "../redux/store"
import { setUser } from "../redux/actions/userActions"

function authRoute(path) {
  if (path === '/') {
    return true
  }
  if (!getToken()) {
    return false
  }
  const groupList = getUserGroupTypeList()
  switch (path) {
    case '/workflow/workflowSetting/':
      if (groupList.includes('IT')) {
        return true
      } else {
        return false
      }
    default:
      return true
  }
}

function authMenu(path) {
  const groupList = getUserGroupTypeList()
  switch (path) {
    case '/workflow/workflowSetting/':
      if (groupList.includes('IT')) {
        return true
      } else {
        return false
      }
    default:
      return true
  }
}

function signIn(data) {
  localStorage.setItem('token', data.token)
  const rawUser = data.user
  const user = {
    id: rawUser.id,
    groupList: rawUser.groupList,
    displayName: rawUser.displayName,
    groupTypeList: rawUser.groupTypeList,
  }
  store.dispatch(setUser(user))
  localStorage.setItem('user', JSON.stringify(user))
  Loading.hide()
  CommonTip.success(L('Success'))
}

function signOut() {
  Loading.show()
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
  Loading.hide()
  CommonTip.success(L('Success'))
  window.location.href = '/'
}

function getToken() {
  return window.localStorage.getItem("token")
}

function getUser() {
  // return window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")) : false
  return store.getState().userReducer.currentUser
}

function getUserGroupList() {
  const user = getUser()
  if (!user) return null
  const { groupList } = user
  return groupList
}

function getUserGroupTypeList() {
  const user = getUser()
  if (!user) return null
  const { groupTypeList } = user
  return groupTypeList
}

export { authRoute, authMenu, signIn, signOut, getUserGroupList, getUserGroupTypeList }
