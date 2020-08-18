import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Create, Update, Detail } from './components'

const parentTitle = 'Resource'
const title = 'IP Address'

function IPAssignment() {
  const props = {
    title,
    parentTitle,
    Detail,
    Update,
    Create,
    List,
  }
  return (
    <React.Fragment>
      <CommonPage
        {...props}
      />
    </React.Fragment>
  )
}

export default IPAssignment
