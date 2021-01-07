import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"
import http from "../utils/request"

const path = envUrl.aaa + envPrefix.aaa

class inventory {
  list(params) {
    return http(`${path}/inventory/list`, {
      method: 'GET',
      params
    })
  }

  listStatus(params) {
    return http(`${path}/inventory/listStatus`, {
      method: 'GET',
      params
    })
  }

  listEquipType(params) {
    return http(`${path}/inventory/listEquipType`, {
      method: 'GET',
      params
    })
  }

  create(data) {
    return http(`${path}/inventory/create`, {
      method: 'POST',
      data
    })
  }

  detail(id) {
    return http(`${path}/inventory/detail`, {
      method: 'GET',
      params: {
        id,
      },
    })
  }

  update(id, data) {
    return http(`${path}/inventory/update`, {
      method: 'PUT',
      params: {
        id,
      },
      data
    })
  }

  deleteMany(data) {
    return http(`${path}/inventory/deleteMany`, {
      method: 'DELETE',
      data
    })
  }

  checkIDExist(id, _ID) {
    return http(`${path}/inventory/checkIDExist`, {
      method: 'GET',
      params: {
        id,
        _ID,
      }
    })
  }
}

export default new inventory()
