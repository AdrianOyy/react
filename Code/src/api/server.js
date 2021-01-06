import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"
import http from "../utils/request"

const path = envUrl.aaa + envPrefix.aaa

class server {
  list(params) {
    return http(`${path}/server/list`, {
      method: 'GET',
      params,
    })
  }

  create(data) {
    return http(`${path}/server/create`, {
      method: 'POST',
      data,
    })
  }

  detail(id) {
    return http(`${path}/server/detail`, {
      method: 'GET',
      params: {
        id,
      },
    })
  }

  update(id, data) {
    return http(`${path}/server/update`, {
      method: 'PUT',
      params: {
        id,
      },
      data,
    })
  }

  deleteMany(data) {
    return http(`${path}/server/deleteMany`, {
      method: 'DELETE',
      data,
    })
  }

  checkIDExist(id, _ID) {
    return http(`${path}/server/checkIDExist`, {
      method: 'GET',
      params: {
        id,
        _ID,
      },
    })
  }
}

export default new server()
