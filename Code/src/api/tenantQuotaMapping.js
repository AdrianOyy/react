import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"
import http from "../utils/request"

const path = envUrl.aaa + envPrefix.aaa

class tenantQuotaMapping {
  list(params) {
    return http(`${path}/tenant_quota_mapping/list`, {
      method: 'GET',
      params,
    })
  }

  create(data) {
    return http(`${path}/tenant_quota_mapping/create`, {
      method: 'POST',
      data,
    })
  }

  detail(id) {
    return http(`${path}/tenant_quota_mapping/detail`, {
      method: 'GET',
      params: {
        id,
      },
    })
  }

  update(id, data) {
    return http(`${path}/tenant_quota_mapping/update`, {
      method: 'PUT',
      params: {
        id,
      },
      data,
    })
  }

  deleteMany(data) {
    return http(`${path}/tenant_quota_mapping/deleteMany`, {
      method: 'DELETE',
      data,
    })
  }

  checkExist(id, tenantId, year, type) {
    return http(`${path}/tenant_quota_mapping/checkExist`, {
      method: 'GET',
      params: {
        id,
        tenantId,
        year,
        type,
      },
    })
  }
}

export default new tenantQuotaMapping()
