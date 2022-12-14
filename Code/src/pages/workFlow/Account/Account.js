import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Create } from './components'
import { L } from '../../../utils/lang'
const parentTitle = L('Workflow')
const title = L('Account management')

function Account() {
  const props = {
    title,
    parentTitle,
    List,
    Create,
    CreateWithId: true
  }
  return (
    <React.Fragment>
      <CommonPage
        {...props}
      />
    </React.Fragment>
  )
}

export default Account
