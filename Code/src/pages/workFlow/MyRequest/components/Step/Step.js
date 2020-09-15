import React, { useEffect } from 'react'
import HAStep from "../../../../../components/HAStep"

function WorkFlowStep(props) {
  const { onMount, processInstanceId } = props

  // 用于更新面包屑
  useEffect(() => {
    onMount('Step')
    // eslint-disable-next-line
  }, [])

  return (
    <HAStep
      processInstanceId={processInstanceId}
    />
  )
}
export default WorkFlowStep
