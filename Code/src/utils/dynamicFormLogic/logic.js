import vmAllocation from "./vmAllocation"

function getLogic(formKey) {
  switch (formKey) {
    case 'vmAllocation3':
      return new vmAllocation()
    default:
      break
  }
}

export default getLogic
