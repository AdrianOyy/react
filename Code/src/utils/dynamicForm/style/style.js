import Common from './Common'
import VMAllocation from "./VMAllocation"


export default function getStyle(workflowName, props) {
  switch (workflowName) {
    case 'VM Allocation':
      return new VMAllocation()
    default:
      return new Common()
  }
}
