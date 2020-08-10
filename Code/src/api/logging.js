import request from '../utils/request'
const prefix = ''

class Logging {
  list(params) {
    return request.get(`${prefix}/logging/list`, params)
  }

  deleteMany(params) {
    return request.delete(`${prefix}/logging/deleteMany`, params)
  }
}

export default new Logging()
