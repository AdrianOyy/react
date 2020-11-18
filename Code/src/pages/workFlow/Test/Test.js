import React from 'react'
import CommonPage from "../../../components/CommonPage"
import Create from './Create'
import Detail from './Detail'


export default function test() {
  const props = {
    Create,
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
