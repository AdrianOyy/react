import request from '../utils/request'

const prefix = ''
// const prefix = '/AAA'

class role {
  list(params, options) {
    return request.get(`${prefix}/tenant_group_mapping/list`, params, options)
  }
  create(params) {
    return request.post(`${prefix}/tenant_group_mapping/create`, params)
  }
  detail(id) {
    return request.get(`${prefix}/tenant_group_mapping/detail?id=${id}`)
  }
  update(id, params) {
    return request.put(`${prefix}/tenant_group_mapping/update?id=${id}`, params)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/tenant_group_mapping/deleteMany`, params)
  }
  checkExist(id, tenantId, groupId) {
    return request.get(`${prefix}/tenant_group_mapping/checkExist?id=${id}&tenantId=${tenantId}&groupId=${groupId}`)
  }
  handledList() {
    return request.get(`${prefix}/tenant_group_mapping/handledList`)
  }
}

export default new role()
