import request from '../utils/request'

class SyncUser {
  list(params, options) {
    return request.get('/AAA/syncUser/list', params, options)
  }
}

export default new SyncUser()
