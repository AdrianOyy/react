import VMAllocation from "./VMAllocation"
import WorkflowSetting from "./WorkflowSetting"
import AccountManagement from "./AccountManagement"
import Common from "./Common"

function getLogic(workflowName) {
  switch (workflowName) {
    case 'VM Allocation':
      return new VMAllocation()
    case 'WorkflowSetting':
      return new WorkflowSetting()
    case 'Account management':
      return new AccountManagement()
    default:
      return new Common()
  }
}

export default getLogic
