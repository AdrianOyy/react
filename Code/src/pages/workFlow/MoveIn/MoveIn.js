import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Create } from './components'

const parentTitle = 'Workflow'
const title = 'Move In'

function MyRequest() {
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

export default MyRequest
