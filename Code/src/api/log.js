import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.logging
const url = envUrl.logging

class Log {
  list(params) {
    return request.get(`${prefix}/log/list`, params, {}, url)
  }

  delete(data, options) {
    return request.delete(`${prefix}/log/delete`, data, options, url)
  }

  deleteMany(params) {
    return request.delete(`${prefix}/log/deleteMany`, params, {}, url)
  }
}

export default new Log()
