import getVMLogic from "./VMAllocation"
// import WorkflowSetting from "./WorkflowSetting"
// import AccountManagement from "./AccountManagement"
// import NonPersonalAccount from "./NonPersonalAccount"
// import DistributionList from "./DistributionList"
// import ClosingAccount from "./ClosingAccount"
import getCommon from "./Common"
import getClosingLogic from "./ClosingAccount"
import getAccountLogic from "./Account"
import getNonPersonalLogic from "./NonPersonal"

async function getLogic(workflowName, props) {
  switch (workflowName) {
    case 'VM Allocation':
      return getVMLogic(props)
    // case 'WorkflowSetting':
    //   return new WorkflowSetting()
    case 'Account management':
      return new getAccountLogic(props)
    case 'Non-Personal Account':
      return getNonPersonalLogic(props)
    // case 'Distribution List':
    //   return new DistributionList()
    case 'Closing Account':
      return getClosingLogic(props)
    default:
      return getCommon(props)
  }
}

export default getLogic
