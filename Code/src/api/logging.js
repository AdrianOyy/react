import request from '../utils/request'

class Logging {
  list(params, options) {
    return request.get('/logging/list', params, options)
  }
}

export default new Logging()
