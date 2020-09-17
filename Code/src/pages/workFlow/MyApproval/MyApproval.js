import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail, Step } from './components'

const path = '/workflow/request'
const parentTitle = 'Workflow'
const title = 'My Approval'

function MyRequest() {
  const props = {
    path,
    title,
    parentTitle,
    List,
    Detail,
    Step
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
