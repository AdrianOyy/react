import request from '../utils/request'

class Auth {
  login(params, options) {
    // return request.get('/AAA/user/login', params, options)
    return request.post('/user/login', params, options)
  }
}

export default new Auth()
