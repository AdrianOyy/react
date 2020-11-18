import getVMLogic from "./VMAllocation"
// import WorkflowSetting from "./WorkflowSetting"
// import AccountManagement from "./AccountManagement"
// import NonPersonalAccount from "./NonPersonalAccount"
// import DistributionList from "./DistributionList"
// import ClosingAccount from "./ClosingAccount"
import getCommon from "./Common"
import getClosingLogic from "./ClosingAccount"

async function getLogic(workflowName, props) {
  console.log('workflowName=========================workflowName')
  console.log(workflowName)
  console.log('workflowName=========================workflowName')
  switch (workflowName) {
    case 'VM Allocation':
      return getVMLogic(props)
    // case 'WorkflowSetting':
    //   return new WorkflowSetting()
    // case 'Account management':
    //   return new AccountManagement()
    // case 'Non-Personal Account':
    //   return new NonPersonalAccount()
    // case 'Distribution List':
    //   return new DistributionList()
    case 'Closing Account':
      return getClosingLogic(props)
    default:
      return getCommon(props)
  }
}

export default getLogic
