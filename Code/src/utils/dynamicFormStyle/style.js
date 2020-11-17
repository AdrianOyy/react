import getVmAllocation from "./vmAllocation"
import common from "./common"

export default function getStyle(workflowName, stepName) {
  switch (workflowName) {
    case 'VM Allocation':
      return getVmAllocation(stepName)
    default:
      return common
  }
}
