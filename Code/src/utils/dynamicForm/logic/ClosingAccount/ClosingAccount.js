import { Common } from "../Common"
import { isEmail } from "../../../regex"
import accountManagementAPI from "../../../../api/accountManagement"


class ClosingAccount extends Common {
  async checkParentField(field) {
    const { fieldName, required, fieldDisplayName } = field
    if (required && this.isEmpty(fieldName)) {
      const message = `${fieldDisplayName} is required`
      this.parentFieldError.set(fieldName, message)
      return { error: true, message }
    }
    if (fieldName === 'supervisoremailaccount') {
      if (!isEmail(this.parentData.get('supervisoremailaccount'))) {
        const message = 'Incorrect Email Address'
        this.parentFieldError.set(fieldName, message)
        return { error: true, message }
      }
      const { data } = await accountManagementAPI.getUsersByEmails({ emails: [ this.parentData.get('supervisoremailaccount') ] })
      if (!data.data || !data.data[0]) {
        const message = 'User never logged in'
        this.parentFieldError.set(fieldName, message)
        return { error: true, message }
      }
    }
    this.parentFieldError.set(fieldName, null)
    return { error: false, message: '' }
  }
}

export default async function getClosingLogic(props) {
  const { stepName } = props
  switch (stepName) {
  //   case CREATE:
  //     return new VMCreate(props)
  //   case DETAIL:
  //     return new VMDetail(props)
    default:
      return new ClosingAccount(props)
  }
}
