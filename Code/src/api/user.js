import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"
import http from "../utils/request"

const path = envUrl.aaa + envPrefix.aaa

class User {
  list(params) {
    return http(`${path}/user/list`, {
      method: 'GET',
      params,
    })
  }

  detail(id) {
    return http(`${path}/user/detail`, {
      method: 'GET',
      params: {
        id,
      },
    })
  }
}

export default new User()
