import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"
import http from "../utils/request"

const path = envUrl.aaa + envPrefix.aaa

class role {
  list(params) {
    return http(`${path}/role/list`, {
      method: 'GET',
      params,
    })
  }
}

export default new role()
