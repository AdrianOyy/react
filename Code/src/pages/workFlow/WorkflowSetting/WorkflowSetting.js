import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail } from './components'

const parentTitle = 'Workflow'
const title = 'Workflow Setting'

function WorkflowSetting() {
  const props = {
    title,
    parentTitle,
    List,
    Detail
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
