import request from '../utils/request'

class Auth {
  login(params, options) {
    return request.get('/syncUser/login', params, options)
    // return request.post('/syncUser/login', params, options)
  }
}

export default new Auth()
