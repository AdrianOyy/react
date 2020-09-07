import request from '../utils/request'
import envPrefix from "../utils/prefix"
// import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

class diyForm {
  create(data) {
    return request.post(`${prefix}/diyForm/create`, data)
  }
  detail(params) {
    return request.get(`${prefix}/diyForm/detail`, params)
  }
  update(data) {
    return request.post(`${prefix}/diyForm/update`, data)
  }
  check(data) {
    return request.post(`${prefix}/vm/check`, data)
  }
}

export default new diyForm()
