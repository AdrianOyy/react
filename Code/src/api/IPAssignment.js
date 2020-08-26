import request from '../utils/request'
import envPrefix from "../utils/prefix"

const prefix = envPrefix.workflow

class IPAssignment {
  list(params) {
    return request.get(`${prefix}/ipAssign/list`, params)
  }
  create(data) {
    return request.post(`${prefix}/ipAssign/create`, data)
  }
  detail(params) {
    return request.get(`${prefix}/ipAssign/detail`, params)
  }
  update(id, params) {
    return request.put(`${prefix}/ipAssign/update?id=${id}`, params)
  }
  deleteMany(params) {
    return request.delete(`${prefix}/ipAssign/deleteMany`, params)
  }
  checkIpExist(params) {
    return request.get(`${prefix}/ipAssign/checkIpExist`, params)
  }
}

export default new IPAssignment()
