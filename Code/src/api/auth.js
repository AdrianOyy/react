import request from '../utils/request'

class Auth {
  login(params, options) {
    // return request.post('/AAA/user/login', params, options)
    return request.post('/user/login', params, options, 'http://127.0.0.1:7001')
  }
}

export default new Auth()
