import http from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const path = envUrl.aaa + envPrefix.aaa

class procedure {
  call(params) {
    return http(`${path}/procedure/call`, {
      method: 'GET',
      params
    })
  }
}

export default new procedure()
