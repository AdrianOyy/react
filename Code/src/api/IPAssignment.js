import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.workflow
const url = envUrl.workflow

class IPAssignment {
  list(params, options) {
    return request.get(`${prefix}/IPAssignment/getIPAssignment`, params, options, url)
  }
  create(params) {
    return request.post(`${prefix}/IPAssignment/createIPAssignment`, params, {}, url)
  }
  detail(id) {
    return request.get(`${prefix}/IPAssignment/getIPAssignmentById?id=${id}`, {}, {}, url)
  }
  update(id, params) {
    return request.put(`${prefix}/IPAssignment/updateIPAssignment?id=${id}`, params, {}, url)
  }
  deleteMany(params) {
    console.log(params)
    return request.delete(`${prefix}/IPAssignment/deleteIPAssignment`, params, {}, url)
  }
//   createModel(params, options) {
//     return request.get(`${prefix}/create`, params, options, url)
//   }
//   openDesigner(params, options) {
//     return request.get(`${prefix}/openDesigner`, params, options, url)
//   }
}

export default new IPAssignment()