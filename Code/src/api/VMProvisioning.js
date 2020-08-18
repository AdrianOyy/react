import request from '../utils/request'
import envPrefix from "../utils/prefix"
import envUrl from "../utils/baseUrl"

const prefix = envPrefix.workflow
const url = envUrl.workflow

class VMProvisioning {
  list(params, options) {
    return request.get(`${prefix}/VmProvisioningRequest/getVmProvisioningRequest`, params, options, url)
  }
  create(params) {
    return request.post(`${prefix}/VmProvisioningRequest/createVmProvisioningRequest`, params, {}, url)
  }
  detail(id) {
    return request.get(`${prefix}/VmProvisioningRequest/getVmProvisioningRequestById?id=${id}`, {}, {}, url)
  }
  update(id, params) {
    return request.put(`${prefix}/VmProvisioningRequest/updateVmProvisioningRequest?id=${id}`, params, {}, url)
  }
  deleteMany(params) {
    console.log(params)
    return request.delete(`${prefix}/VmProvisioningRequest/deleteVmProvisioningRequest`, params, {}, url)
  }
}

export default new VMProvisioning()