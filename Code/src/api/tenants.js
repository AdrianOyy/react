import request from '../utils/request'

class tenants {
  list(params, options) {
    return request.get('/AAA/tenants/list', params, options)
    // return request.get('/tenants/list', params, options)
  }
}

export default new tenants()
