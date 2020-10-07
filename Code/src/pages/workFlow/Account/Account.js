import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Create } from './components'

const parentTitle = 'Workflow'
const title = 'Account management'

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
