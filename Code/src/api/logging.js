import request from '../utils/request'

class Logging {
  list(params, options) {
    return request.get('/logging/list', params, options)
  }

  delete(params, options) {
    return request.get('/logging/delete', params, options)
  }
}

export default new Logging()
