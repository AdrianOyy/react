import request from '../utils/request'

const prefix = ''

class assign {
  list(params) {
    return request.get(`${prefix}/expiry/list`, params)
  }
  detail(id) {
    return request.get(`${prefix}/expiry/detail?id=${id}`)
  }
  update(id, params) {
    return request.put(`${prefix}/expiry/update?id=${id}`, params)
  }
  create(params) {
    return request.post(`${prefix}/expiry/create`, params)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/expiry/deleteMany`, params)
  }
  checkExist(id, parmas) {
    const { assignId, userId } = parmas
    return request.get(`${prefix}/expiry/checkExist?id=${id}&assignId=${assignId}&userId=${userId}`)
  }
}

export default new assign()
