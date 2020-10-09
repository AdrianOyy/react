import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail, Create, Step } from './components'
import { L } from '../../../utils/lang'

const path = '/workflow/request'
const parentTitle = L('My Request')
const title = L('My Request')

function MyRequest() {
  const props = {
    path,
    title,
    parentTitle,
    List,
    Detail,
    Create,
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
