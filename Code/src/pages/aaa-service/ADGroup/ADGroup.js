import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail, Update, Create } from './components'

const path = '/aaa-service/adGroup'
const parentTitle = 'AAA-Service'
const title = 'AD Group'

function ADGroup() {
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

export default ADGroup
