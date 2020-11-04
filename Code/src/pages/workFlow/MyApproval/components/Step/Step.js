import React from 'react'
import HAStep from "../../../../../components/HAStep"
import { useParams } from "react-router-dom"

function WorkFlowStep() {
  const { id } = useParams()

  return (
    <HAStep
      processInstanceId={id}
    />
  )
}
export default WorkFlowStep
