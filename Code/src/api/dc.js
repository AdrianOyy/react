import request from '../utils/request'
import envPrefix from "../utils/prefix"

const prefix = envPrefix.aaa


class dynamicForm {
  list(params) {
    return request.get(`${prefix}/dc/list`, params)
  }
}

export default new dynamicForm()
