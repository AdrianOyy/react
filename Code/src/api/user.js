import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa
const url = envUrl.user

class User {
  list(params, options) {
    return request.get(`${prefix}/user/list`, params, options, url)
  }
  detail(id) {
    return request.get(`${prefix}/user/detail?id=${id}`, {}, {}, url)
  }
}

export default new User()
