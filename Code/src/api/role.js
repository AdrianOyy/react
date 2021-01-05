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

  create(data) {
    return http(`${path}/role/create`, {
      method: 'POST',
      data,
    })
  }

  detail(id) {
    return http(`${path}/role/detail`, {
      method: 'GET',
      params: {
        id,
      },
    })
  }

  update(id, data) {
    return http(`${path}/role/update`, {
      method: 'PUT',
      params: {
        id,
      },
      data,
    })
  }

  deleteMany(data) {
    return http(`${path}/role/deleteMany`, {
      method: 'DELETE',
      data,
    })
  }

  checkLabel(id, label) {
    return http(`${path}/role/deleteMany`, {
      method: 'GET',
      params: {
        id,
        label,
      },
    })
  }
}

export default new role()
