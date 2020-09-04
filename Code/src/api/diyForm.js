import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.aaa

class diyForm {
  create(data) {
    return request.post(`${prefix}/diyForm/create`, data)
  }
}

export default new diyForm()
