import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"
// import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa
const url = envUrl.group

class HADynamicForm {
  getDynamicForm(params) {
    return request.get(`${prefix}/dynamicForm/getDynamicForm`, params, {}, url)
  }
  getInitData(params) {
    return request.get(`${prefix}/haDynamicForm/getInitData`, params)
  }
}

export default new HADynamicForm()
