import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail, Update, Create } from './components'

const path = '/aaa-service/tenantAdGroupMapping'
const parentTitle = 'AAA-Service'
const title = 'Tenant Group Mapping'

function TenantGroupMapping() {
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

export default TenantGroupMapping
