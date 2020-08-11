import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

const url = envUrl.group

class adGroup {
  list(params, options) {
    return request.get(`${prefix}/ad_group/list`, params, options, url)
  }
  create(params) {
    return request.post(`${prefix}/ad_group/create`, params, {}, url)
  }
  detail(id) {
    return request.get(`${prefix}/ad_group/detail?id=${id}`, {}, {}, url)
  }
  update(id, params) {
    return request.put(`${prefix}/ad_group/update?id=${id}`, params, {}, url)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/ad_group/deleteMany`, params, {}, url)
  }
  checkName(id, name) {
    return request.get(`${prefix}/ad_group/checkName?id=${id}&name=${name}`, {}, {}, url)
  }
}

export default new adGroup()
