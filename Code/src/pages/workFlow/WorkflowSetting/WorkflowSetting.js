import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List } from './components'

const path = '/workflow/workflowSetting'
const parentTitle = 'Workflow'
const title = 'Workflow Setting'

function WorkflowSetting() {
  const props = {
    path,
    title,
    parentTitle,
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

export default WorkflowSetting
