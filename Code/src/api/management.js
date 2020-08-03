import request from '../utils/request'

const prefix = ''

class Management {
  list(params, options) {
    return request.get(`${ prefix }/management/list`, params, options)
  }
}

export default new Management()