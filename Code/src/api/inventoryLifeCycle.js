import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

const url = envUrl.group

class inventoryLifeCycle {
  list(params, options) {
    return request.get(`${prefix}/inventoryLifeCycle/list`, params, options, url)
  }
  listInventorys(params, options) {
    return request.get(`${prefix}/inventoryLifeCycle/listInventorys`, params, options, url)
  }
  create(params) {
    return request.post(`${prefix}/inventoryLifeCycle/create`, params, {}, url)
  }
  detail(id) {
    return request.get(`${prefix}/inventoryLifeCycle/detail?id=${id}`, {}, {}, url)
  }
  update(id, params) {
    return request.put(`${prefix}/inventoryLifeCycle/update?id=${id}`, params, {}, url)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/inventoryLifeCycle/deleteMany`, params, {}, url)
  }
  checkIDExist(id, _ID) {
    return request.get(`${prefix}/inventoryLifeCycle/checkIDExist?id=${id}&_ID=${_ID}`, {}, {}, url)
  }
}

export default new inventoryLifeCycle()
