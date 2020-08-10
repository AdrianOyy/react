import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail } from './components'

const path = '/aaa-service/user'
const parentTitle = 'AAA-Service'
const title = 'User'

function Tenant() {
  const props = {
    path,
    title,
    parentTitle,
    List,
    Detail,
  }
  return (
    <React.Fragment>
      <CommonPage
        {...props}
      />
    </React.Fragment>
  )
}

export default Tenant
