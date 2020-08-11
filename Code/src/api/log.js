import request from '../utils/request'
import envPrefix from "../utils/prefix"

const prefix = envPrefix.logging

class Log {
  list(params) {
    return request.get(`${prefix}/log/list`, params)
  }

  delete(data, options) {
    return request.delete(`${prefix}/log/delete`, data, options)
  }

  deleteMany(params) {
    return request.delete(`${prefix}/log/deleteMany`, params)
  }
}

export default new Log()
