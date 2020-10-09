import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List, Detail, Update, Create } from './components'
import { L } from '../../../utils/lang'
const parentTitle = L('AAA Service')
const title = L('Expiry')

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
