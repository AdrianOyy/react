import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"
import http from "../utils/request"

const path = envUrl.aaa + envPrefix.aaa

class assign {
  list(params) {
    return http(`${path}/expiry/list`, {
      method: 'GET',
      params
    })
  }

  detail(id) {
    return http(`${path}/expiry/detail`, {
      method: 'GET',
      params: {
        id,
      },
    })
  }

  update(id, data) {
    return http(`${path}/expiry/update`, {
      method: 'PUT',
      params: {
        id,
      },
      data
    })
  }

  create(data) {
    return http(`${path}/expiry/create`, {
      method: 'POST',
      data
    })
  }

  deleteMany(data) {
    return http(`${path}/expiry/deleteMany`, {
      method: 'DELETE',
      data
    })
  }

  checkExist(id, params) {
    return http(`${path}/expiry/checkExist`, {
      method: 'GET',
      params: {
        ...params,
        id
      }
    })
  }
}

export default new assign()
