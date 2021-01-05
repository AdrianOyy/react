import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"
import http from "../utils/request"

const path = envUrl.aaa + envPrefix.aaa

class inventoryLifeCycle {
  list(params) {
    return http(`${path}/inventoryLifeCycle/list`, {
      method: 'GET',
      params
    })
  }

  listInventorys(params) {
    return http(`${path}/inventoryLifeCycle/listInventorys`, {
      method: 'GET',
      params
    })
  }

  create(data) {
    return http(`${path}/inventoryLifeCycle/create`, {
      method: 'POST',
      data,
    })
  }

  detail(id) {
    return http(`${path}/inventoryLifeCycle/detail`, {
      method: 'GET',
      params: {
        id,
      },
    })
  }

  update(id, data) {
    return http(`${path}/inventoryLifeCycle/update`, {
      method: 'PUT',
      params: {
        id,
      },
      data,
    })
  }

  deleteMany(data) {
    return http(`${path}/inventoryLifeCycle/deleteMany`, {
      method: 'DELETE',
      data,
    })
  }

  checkIDExist(id, _ID) {
    return http(`${path}/inventoryLifeCycle/checkIDExist`, {
      method: 'GET',
      params: {
        id,
        _ID,
      },
    })
  }
}

export default new inventoryLifeCycle()
