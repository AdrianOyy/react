import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"
import http from "../utils/request"

const path = envUrl.aaa + envPrefix.aaa

class diyForm {
  create(data) {
    return http(`${path}/diyForm/create`, {
      method: 'POST',
      data
    })
  }

  detail(params) {
    return http(`${path}/diyForm/detail`, {
      method: 'GET',
      params
    })
  }

  update(data) {
    return http(`${path}/diyForm/update`, {
      method: 'POST',
      data
    })
  }

  check(data) {
    return http(`${path}/vm/check`, {
      method: 'POST',
      data
    })
  }
}

export default new diyForm()
