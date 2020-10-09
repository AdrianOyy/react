import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail, Update, Create } from './components'
import { L } from '../../../utils/lang'
const parentTitle = L('Allocation')
const title = L('Tenant Quota Mapping')

function TenantQuotaMapping() {
  const props = {
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

export default TenantQuotaMapping
