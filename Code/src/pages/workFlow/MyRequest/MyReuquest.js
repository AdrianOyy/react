import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail, Create } from './components'

const path = '/workflow/request'
const parentTitle = 'My Request'
const title = 'My Request'

function MyRequest() {
  const props = {
    path,
    title,
    parentTitle,
    List,
    Detail,
    Create
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
