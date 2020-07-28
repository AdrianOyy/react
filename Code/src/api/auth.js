import request from '../utils/request'

class Auth {
  login(params, options) {
    return request.get('/AAA/syncUser/login', params, options)
    // return request.post('/syncUser/login', params, options)
  }
}

export default new Auth()
