import request from '../utils/request'

const prefix = ''

class assign {
  list(params) {
    return request.get(`${prefix}/assign/list`, params)
  }
  detail(id) {
    return request.get(`${prefix}/assign/detail?id=${id}`)
  }
  update(id, params) {
    return request.put(`${prefix}/assign/update?id=${id}`, params)
  }
  create(params) {
    return request.post(`${prefix}/assign/create`, params)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/assign/deleteMany`, params)
  }
  checkExist(id, parmas) {
    const { mappingId } = parmas;
    return request.get(`${prefix}/assign/checkExist?id=${id}&mappingId=${mappingId}`)
  }
  handledList() {
    return request.get(`${prefix}/assign/handledList`)
  }
}

export default new assign()
