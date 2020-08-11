import request from '../utils/request'

// const prefix = ''
// const url = 'http://127.0.0.1:7001'
const prefix = '/AAA'
const url = null

class User {
  list(params, options) {
    return request.get(`${prefix}/user/list`, params, options, url)
  }
  detail(id) {
    return request.get(`${prefix}/user/detail?id=${id}`, {}, {}, url)
  }
}

export default new User()
