import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"
import http from "../utils/request"

const path = envUrl.aaa + envPrefix.aaa

class platform {
  list(params) {
    return http(`${path}/platform/list`, {
      method: 'GET',
      params,
    })
  }

  listType(params) {
    return http(`${path}/platform/listType`, {
      method: 'GET',
      params,
    })
  }

  create(data) {
    return http(`${path}/platform/create`, {
      method: 'POST',
      data,
    })
  }

  detail(id) {
    return http(`${path}/platform/detail`, {
      method: 'GET',
      params: {
        id,
      },
    })
  }

  update(id, data) {
    return http(`${path}/platform/update`, {
      method: 'PUT',
      params: {
        id
      },
      data,
    })
  }

  deleteMany(data) {
    return http(`${path}/platform/deleteMany`, {
      method: 'DELETE',
      data,
    })
  }

  checkName(id, name) {
    return http(`${path}/platform/checkName`, {
      method: 'GET',
      params: {
        id,
        name,
      },
    })
  }
}

export default new platform()
