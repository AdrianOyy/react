import request from '../utils/request'

class SyncUser {
  list(params, options) {
    // return request.get('/AAA/user/list', params, options)
    return request.get('/user/list', params, options)
  }
  detail(id) {
    // return request.get('/AAA/user/list')
    return request.get(`/user/detail?id=${id}`)
  }
  // sync(params, options) {
  //   // return request.get('/AAA/user/sync', params, options)
  //   return request.get('/user/sync', params, options)
  // }
}

export default new SyncUser()
