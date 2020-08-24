import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

const url = envUrl.group

class platform {
  list(params, options) {
    return request.get(`${prefix}/platform/list`, params, options, url)
  }
  create(params) {
    return request.post(`${prefix}/platform/create`, params, {}, url)
  }
  detail(id) {
    return request.get(`${prefix}/platform/detail?id=${id}`, {}, {}, url)
  }
  update(id, params) {
    return request.put(`${prefix}/platform/update?id=${id}`, params, {}, url)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/platform/deleteMany`, params, {}, url)
  }
  checkName(id, name) {
    return request.get(`${prefix}/platform/checkName?id=${id}&name=${name}`, {}, {}, url)
  }
}

export default new platform()
