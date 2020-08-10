import request from '../utils/request'
const prefix = ''

class Logging {
  list(params) {
    return request.get(`${prefix}/logging/list`, params)
  }

  delete(data, options) {
    return request.delete(`/logging/delete`, data, options)
  }

  deleteMany(params) {
    return request.delete(`${prefix}/logging/deleteMany`, params)
  }
}

export default new Logging()
