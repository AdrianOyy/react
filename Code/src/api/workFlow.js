import request from '../utils/requestWorkflow'

// class WorkFlow {


export function getProcessDefinitions() {
  return request({
    url: '/repository/models',
    method: 'get',
  })
}

export function createModel() {
  return request({
    url: '/create',
    method: 'get',
  })
}

export function openDesigner() {
  return request({
    url: '/openDesigner',
    method: 'get',
  })
}
// deleteDeployment(params){
//   return request.delete(`repository/models/${params}`)
// }

// publish(params){
//   return request.get(`publish/${params}`)
// }
// }

// export default new WorkFlow()
