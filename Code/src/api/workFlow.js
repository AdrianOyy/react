import request from '../utils/request'

class WorkFlow {
  getProcessDefinitions(){
    return request.get('repository/models')
  }

  deleteDeployment(params){
    return request.delete(`repository/models/${params}`)
  }

  publish(params){
    return request.get(`publish/${params}`)
  }
}

export default new WorkFlow()