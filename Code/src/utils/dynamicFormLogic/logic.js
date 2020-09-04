import VMAllocation from "./VMAllocation"
import Common from "./Common"

function getLogic(workflowName, DynamicFormEl) {
  switch (workflowName) {
    case 'VM Allocation':
      return new VMAllocation()
    default:
      return new Common()
  }
}

export default getLogic
