import request from '../utils/request'
import envPrefix from "../utils/prefix"
// import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

class accountManagement {
  userExistsMany(data) {
    return request.post(`${prefix}/accountManagement/userExistsMany`, data)
  }
  getUsersByEmails(data) {
    return request.post(`${prefix}/accountManagement/getUsersByEmails`, data)
  }
}

export default new accountManagement()
