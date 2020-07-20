import request from '../utils/request'

class Logging {
  list(params, options) {
    return request.get('/logging/list', params, options)
  }

  delete(data, options) {
    return request.delete(`/logging/delete`,data, options)
  }
}

export default new Logging()
