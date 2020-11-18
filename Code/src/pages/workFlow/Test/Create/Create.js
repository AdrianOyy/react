import React from 'react'
import HADynamicForm from "../../../../components/HADynamicForm"
import { CREATE, DETAIL } from "../../../../utils/variable/stepName"

console.log(DETAIL)

export default function test() {
  return (
    <React.Fragment>
      <HADynamicForm
        pid={2080006}
        cuId={123}
        stepName={CREATE}
      />
    </React.Fragment>
  )
}
