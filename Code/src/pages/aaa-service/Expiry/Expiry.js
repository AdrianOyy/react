import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail, Update, Create } from './components'

const parentTitle = 'AAA Service'
const title = 'Expiry'

function Expiry() {
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

export default Expiry
