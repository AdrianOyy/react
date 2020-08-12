import React from "react"
import CommonPage from "../../../components/CommonPage"
import { List } from './components'

const parentTitle = 'Log'
const title = 'Log'

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
