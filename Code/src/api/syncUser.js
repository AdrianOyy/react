import request from '../utils/request'

class SyncUser {
  list(params, options) {
    return request.get('/syncUser/list', params, options)
  }
}

export default new SyncUser()
