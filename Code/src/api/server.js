import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

const url = envUrl.group

class server {
  list(params, options) {
    return request.get(`${prefix}/server/list`, params, options, url)
  }
  create(params) {
    return request.post(`${prefix}/server/create`, params, {}, url)
  }
  detail(id) {
    return request.get(`${prefix}/server/detail?id=${id}`, {}, {}, url)
  }
  update(id, params) {
    return request.put(`${prefix}/server/update?id=${id}`, params, {}, url)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/server/deleteMany`, params, {}, url)
  }
  checkIDExist(id, _ID) {
    return request.get(`${prefix}/server/checkIDExist?id=${id}&_ID=${_ID}`, {}, {}, url)
  }
}

export default new server()
