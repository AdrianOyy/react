import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

const url = envUrl.group

class vmLocation {
  create(params) {
    return request.post(`${prefix}/vm_location/create`, params, {}, url)
  }
  detail(id) {
    return request.get(`${prefix}/vm_location/detail?id=${id}`, {}, {}, url)
  }
}

export default new vmLocation()
