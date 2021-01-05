import request from '../utils/request'
import envPrefix from "../utils/prefix"

const prefix = envPrefix.aaa

class tenantQuotaMapping {
  list(params, options) {
    return request.get(`${prefix}/tenant_quota_mapping/list`, params, options)
  }

  create(params) {
    return request.post(`${prefix}/tenant_quota_mapping/create`, params)
  }

  detail(id) {
    return request.get(`${prefix}/tenant_quota_mapping/detail?id=${id}`)
  }

  update(id, params) {
    return request.put(`${prefix}/tenant_quota_mapping/update?id=${id}`, params)
  }

  deleteMany(params) {
    return request.delete(`${prefix}/tenant_quota_mapping/deleteMany`, params)
  }

  checkTypeExist(id, tenantId, type) {
    return request.get(`${prefix}/tenant_quota_mapping/checkTypeExist?id=${id}&tenantId=${tenantId}&type=${type}`)
  }

  checkYearExist(id, tenantId, year) {
    return request.get(`${prefix}/tenant_quota_mapping/checkYearExist?id=${id}&tenantId=${tenantId}&year=${year}`)
  }

  checkExist(id, tenantId, year, type) {
    return request.get(`${prefix}/tenant_quota_mapping/checkExist?id=${id}&tenantId=${tenantId}&year=${year}&type=${type}`)
  }
}

export default new tenantQuotaMapping()
