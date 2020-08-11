import request from '../utils/request'
import envPrefix from "../utils/prefix"

const prefix = envPrefix.aaa

class management {
  list(params, options) {
    return request.get(`${prefix}/management/list`, params, options)
  }
  create(params) {
    return request.post(`${prefix}/management/create`, params)
  }
  detail(id) {
    return request.get(`${prefix}/management/detail?id=${id}`)
  }
  update(id, params) {
    return request.put(`${prefix}/management/update?id=${id}`, params)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/management/deleteMany`, params)
  }
  checkExist(id, tenantId, groupId) {
    return request.get(`${prefix}/management/checkExist?id=${id}&tenantId=${tenantId}&groupId=${groupId}`)
  }
}

export default new management()
