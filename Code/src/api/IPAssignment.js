import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl";
import http from "../utils/request"

const path = envUrl.aaa + envPrefix.aaa

class IPAssignment {
  list(params) {
    return http(`${path}/ipAssign/list`, {
      method: 'GET',
      params,
    })
  }

  create(data) {
    return http(`${path}/ipAssign/create`, {
      method: 'POST',
      data,
    })
  }

  detail(params) {
    return http(`${path}/ipAssign/detail`, {
      method: 'GET',
      params,
    })
  }

  update(id, data) {
    return http(`${path}/ipAssign/update`, {
      method: 'PUT',
      params: {
        id
      },
      data,
    })
  }

  deleteMany(data) {
    return http(`${path}/ipAssign/deleteMany`, {
      method: 'DELETE',
      data,
    })
  }

  checkIpExist(params) {
    return http(`${path}/ipAssign/checkIpExist`, {
      method: 'GET',
      params,
    })
  }
}

export default new IPAssignment()
