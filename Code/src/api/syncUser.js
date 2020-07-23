import request from '../utils/request'

class SyncUser {
  list(params, options) {
    return request.get('/AAA/syncUser/list', params, options)
    // return request.get('/syncUser/list', params, options)
  }
  sync(params, options) {
    return request.get('/AAA/syncUser/sync', params, options)
    // return request.get('/syncUser/sync', params, options)
  }
}

export default new SyncUser()
