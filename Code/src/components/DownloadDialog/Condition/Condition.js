import React from "react"
import { VM } from './Item'


export default function Condition(props) {
  const {
    page,
    onChange,
  } = props
  let Condition
  switch (page) {
    case 'VM':
      Condition = VM
      break
    default:
      Condition = <React.Fragment></React.Fragment>
  }
  return <Condition onChange={onChange} />
}
