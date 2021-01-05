import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"
import http from "../utils/request"

const path = envUrl.aaa + envPrefix.aaa

class vmGuest {
  listCluster(params) {
    return http(`${path}/vmCluster/list`, {
      method: 'GET',
      params,
    })
  }

  list(params) {
    return http(`${path}/vmGuest/list`, {
      method: 'GET',
      params,
    })
  }

  create(data) {
    return http(`${path}/vmGuest/create`, {
      method: 'POST',
      data,
    })
  }

  detail(id) {
    return http(`${path}/vmGuest/detail`, {
      method: 'GET',
      params: {
        id,
      },
    })
  }

  update(id, data) {
    return http(`${path}/vmGuest/update`, {
      method: 'GET',
      params: {
        id,
      },
      data,
    })
  }

  deleteMany(data) {
    return http(`${path}/vmGuest/deleteMany`, {
      method: 'DELETE',
      data,
    })
  }

  checkSerialNumber(id, serialNumber) {
    return http(`${path}/vmGuest/checkSerialNumber`, {
      method: 'GET',
      params: {
        id,
        serialNumber,
      },
    })
  }

  download(data) {
    return http(`${path}/vmGuest/export`, {
      method: 'POST',
      responseType: 'blob',
      data,
    })
  }
}

export default new vmGuest()
