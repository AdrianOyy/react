import request from '../utils/request'
import envPrefix from "../utils/prefix"

const prefix = envPrefix.aaa

class role {
  list(params, options) {
    return request.get(`${prefix}/role/list`, params, options)
  }
  create(params) {
    return request.post(`${prefix}/role/create`, params)
  }
  detail(id) {
    return request.get(`${prefix}/role/detail?id=${id}`)
  }
  update(id, params) {
    return request.put(`${prefix}/role/update?id=${id}`, params)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/role/deleteMany`, params)
  }
  checkLabel(id, label) {
    return request.get(`${prefix}/role/checkLabel?id=${id}&label=${label}`)
  }
}

export default new role()
