import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

const url = envUrl.group

class dynamicForm {
  getDynamicForm(params) {
    return request.get(`${prefix}/dynamicForm/getDynamicForm`, params, {}, url)
  }
  save(data) {
    return request.post(`${prefix}/dynamicForm/save`, data, {}, url)
  }
  getDynamicFormDetail(params) {
    return request.get(`${prefix}/dynamicForm/getDynamicFormDetail`, params, {}, url)
  }
}

export default new dynamicForm()
