import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail, Update, Create } from './components'

const path = '/aaa-service/tenant'
const parentTitle = 'AAA-Service'
const title = 'Tenant'

function Tenant() {
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

export default Tenant
