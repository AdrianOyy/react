import request from '../utils/request'
import envPrefix from "../utils/prefix"

const prefix = envPrefix.aaa

class tenant {
  list(params, options) {
    return request.get(`${prefix}/tenant/list`, params, options)
  }
  listGroup(params, options) {
    return request.get(`${prefix}/group/list`, params, options)
  }
  create(params) {
    return request.post(`${prefix}/tenant/create`, params)
  }
  detail(id) {
    return request.get(`${prefix}/tenant/detail?id=${id}`)
  }
  update(id, params) {
    return request.put(`${prefix}/tenant/update?id=${id}`, params)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/tenant/deleteMany`, params)
  }
  checkExist(id, code) {
    return request.get(`${prefix}/tenant/checkExist?id=${id}&code=${code}`)
  }
}

export default new tenant()
