import VMAllocation from "./VMAllocation"
import WorkflowSetting from "./WorkflowSetting"
import Common from "./Common"

function getLogic(workflowName) {
  switch (workflowName) {
    case 'VM Allocation':
      return new VMAllocation()
    case 'WorkflowSetting':
      return new WorkflowSetting()
    default:
      return new Common()
  }
}

export default getLogic
