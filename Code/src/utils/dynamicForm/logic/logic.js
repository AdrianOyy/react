import getVMLogic from "./VMAllocation"
import getCommon from "./Common"
import getClosingLogic from "./ClosingAccount"
import getAccountLogic from "./Account"
import getNonPersonalLogic from "./NonPersonal"
import getDistributionLogic from "./Distribution"

async function getLogic(workflowName, props) {
  switch (workflowName) {
    case 'VM Allocation':
      return getVMLogic(props)
    case 'Account management':
      return new getAccountLogic(props)
    case 'Non-Personal Account':
      return getNonPersonalLogic(props)
    case 'Distribution List':
      return getDistributionLogic(props)
    case 'Closing Account':
      return getClosingLogic(props)
    default:
      return getCommon(props)
  }
}

export default getLogic
