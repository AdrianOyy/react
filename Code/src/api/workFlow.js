import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.workflow
const url = envUrl.workflow

class WorkFlow {
  getProcessDefinitions(params, options) {
    return request.get(`${prefix}/repository/models`, params, options, url)
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
}

export default new WorkFlow()
