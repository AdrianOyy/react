import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List } from './components'
import { L } from '../../../utils/lang'

const parentTitle = L('Log')
const title = L('Log')

function Log() {
  const props = {
    title,
    parentTitle,
    List,
  }
  return (
    <React.Fragment>
      <CommonPage
        {...props}
      />
    </React.Fragment>
  )
}

export default Log
