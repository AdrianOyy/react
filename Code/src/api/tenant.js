import request from '../utils/request'

const prefix = ''
// const prefix = '/AAA'

class assign {
  list(params, options) {
    return request.get(`${prefix}/tenant/list`, params, options)
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
  checkName(id,name) {
    return request.get(`${prefix}/tenant/checkName?id=${id}&name=${name}`)
  }
}

export default new assign()
