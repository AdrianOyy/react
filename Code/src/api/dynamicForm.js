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
  test(params) {
    return request.get(`${prefix}/workflow/createTable`, params)
  }
  create(data) {
    return request.post(`${prefix}/diyForm/create`, data)
  }
  createWorkFlow(data) {
    return request.post(`${prefix}/workflow/create`, data)
  }
  workFlowDetail(params) {
    return request.get(`${prefix}/workflow/detail`, params)
  }
}

export default new dynamicForm()
