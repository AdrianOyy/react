import request from '../utils/request'

class Logging {
  list(params) {
    return request.get('/logging/list', params)
  }

  delete(data, options) {
    return request.delete(`/logging/delete`, data, options)
  }
}

export default new Logging()
