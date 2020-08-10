import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail, Update, Create } from './components'

const path = '/aaa-service/assign'
const parentTitle = 'AAA-Service'
const title = 'Management'

function Management() {
  const props = {
    path,
    title,
    parentTitle,
    List,
    Detail,
    Update,
    Create,
  }
  return (
    <React.Fragment>
      <CommonPage
        {...props}
      />
    </React.Fragment>
  )
}

export default Management
