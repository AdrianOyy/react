import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Create } from './components'

const path = '/workflow/vm'
const parentTitle = 'VM Allocation'
const title = 'VM Allocation'

function MyRequest() {
  const props = {
    path,
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
