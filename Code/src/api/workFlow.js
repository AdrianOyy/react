import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.workflow
const url = envUrl.workflow

class WorkFlow {
  getProcessDefinitions(params, options) {
    return request.get(`${prefix}/repository/modelList`, params, options, url)
  }
  createModel(params, options) {
    return request.get(`${prefix}/create`, params, options, url)
  }
  openDesigner(params, options) {
    return request.get(`${prefix}/openDesigner`, params, options, url)
  }
  getMyRequest(params) {
    return request.get(`${prefix}/ReuqestTask/getMyRequest`, params, {}, url)
  }
  getMyApproval(params) {
    return request.get(`${prefix}/ReuqestTask/getMyApproval`, params, {}, url)
  }
  getDiagram(id) {
    return request.getBuffer(`${prefix}/runtime/process-instances/${id}/diagram`, {}, { }, url)
  }
  getStartFormJson(id) {
    return request.get(`${prefix}/formsetting/getStartFormJson/${id}`, {}, { }, url)
  }
  getPublishModel(id) {
    return request.get(`${prefix}/publish/${id}`, {}, { }, url)
  }
  startProcess(data) {
    return request.post(`${prefix}/process/startProcess/`, data, { }, url)
  }
  getProcessList() {
    return request.get(`${prefix}/repository/process-definitions`, {}, {}, url)
  }
  getTaskListByGroup(data) {
    return request.post(`${prefix}/runtime/getTaskListByGroup/`, data, { }, url)
  }
}

export default new WorkFlow()
