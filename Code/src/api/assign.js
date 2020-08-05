import request from '../utils/request'

class assign {
  list(params, options) {
    // return request.get('/AAA/tenantsMapping/list', params, options)
    return request.get('/tenantsMapping/list', params, options)
  }
  detail(id) {
    // return request.get('/AAA/tenantsMappingMapping/list')
    return request.get(`/tenantsMapping/detail?id=${id}`)
  }
  update(params, options) {
    // return request.put(`/AAA/tenantsMapping/update`, params, options)
    return request.put(`/tenantsMapping/update`, params, options)
  }
}

export default new assign()
