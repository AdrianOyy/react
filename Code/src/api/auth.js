import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa
const url = envUrl.auth


class Auth {
  login(params, options) {
    return request.post(`${prefix}/user/login`, params, options, url)
  }
}

export default new Auth()
