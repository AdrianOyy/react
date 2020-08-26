import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

const url = envUrl.group

class vmGuest {
  listCluster(params, options) {
    return request.get(`${prefix}/vmCluster/list`, params, options, url)
  }
  list(params, options) {
    return request.get(`${prefix}/vmGuest/list`, params, options, url)
  }
  create(params) {
    return request.post(`${prefix}/vmGuest/create`, params, {}, url)
  }
  detail(id) {
    return request.get(`${prefix}/vmGuest/detail?id=${id}`, {}, {}, url)
  }
  update(id, params) {
    return request.put(`${prefix}/vmGuest/update?id=${id}`, params, {}, url)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/vmGuest/deleteMany`, params, {}, url)
  }
  checkSerialNumber(id, serialNumber) {
    return request.get(`${prefix}/vmGuest/checkSerialNumber?id=${id}&serialNumber=${serialNumber}`, {}, {}, url)
  }
}

export default new vmGuest()
