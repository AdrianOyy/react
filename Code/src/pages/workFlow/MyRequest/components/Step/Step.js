import React, { useEffect } from 'react'
import HAStep from "../../../../../components/HAStep"
import { useParams } from "react-router-dom"

function WorkFlowStep(props) {
  const { onMount } = props
  const { id } = useParams()

  // 用于更新面包屑
  useEffect(() => {
    onMount('Step')
    // eslint-disable-next-line
  }, [])

  return (
    <HAStep
      processInstanceId={id}
    />
  )
}
export default WorkFlowStep
