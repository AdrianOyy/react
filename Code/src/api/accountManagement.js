import request from '../utils/request'
import envPrefix from "../utils/prefix"
// import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

class accountManagement {
  userExistsMany(data) {
    return request.post(`${prefix}/accountManagement/userExistsMany`, data)
  }
  checkUsers(data) {
    return request.post(`${prefix}/accountManagement/checkUsers`, data)
  }
}

export default new accountManagement()
