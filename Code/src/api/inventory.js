import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

const url = envUrl.group

class inventory {
  list(params, options) {
    return request.get(`${prefix}/inventory/list`, params, options, url)
  }
  listStatus(params, options) {
    return request.get(`${prefix}/inventory/listStatus`, params, options, url)
  }
  create(params) {
    return request.post(`${prefix}/inventory/create`, params, {}, url)
  }
  detail(id) {
    return request.get(`${prefix}/inventory/detail?id=${id}`, {}, {}, url)
  }
  update(id, params) {
    return request.put(`${prefix}/inventory/update?id=${id}`, params, {}, url)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/inventory/deleteMany`, params, {}, url)
  }
  checkIDExist(id, _ID) {
    return request.get(`${prefix}/inventory/checkIDExist?id=${id}&_ID=${_ID}`, {}, {}, url)
  }
}

export default new inventory()
