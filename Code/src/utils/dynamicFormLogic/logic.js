import VMAllocation from "./VMAllocation"
import WorkflowSetting from "./WorkflowSetting"
import AccountManagement from "./AccountManagement"
import NonPersonalAccount from "./NonPersonalAccount"
import DistributionList from "./DistributionList"
import Common from "./Common"

function getLogic(workflowName) {
  switch (workflowName) {
    case 'VM Allocation':
      return new VMAllocation()
    case 'WorkflowSetting':
      return new WorkflowSetting()
    case 'Account management':
      return new AccountManagement()
    case 'Non Personal Account':
      return new NonPersonalAccount()
    case 'Distribution List':
      return new DistributionList()
    default:
      return new Common()
  }
}

export default getLogic
