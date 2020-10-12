import React, { useEffect } from "react"
import path from '../../../../../utils/path'
import { useParams, useLocation } from "react-router-dom"
import CommonWorkflowForm from "../../../../../components/CommonWorkflowForm"


function Create(props) {
  const { onMount } = props
  const { id } = useParams()
  const arr = path.getQueryString(useLocation().search)
  const deploymentId = arr['deploymentId']
  const cuId = arr['cuId']
  const startData = {
    start: false,
    cuId: null,
  }
  if (cuId) {
    startData.start = true
    startData.cuId = cuId
  }
  // 用于更新面包屑
  useEffect(() => {
    onMount('create')
    // eslint-disable-next-line
  }, [])
  return (
    <React.Fragment>
      <CommonWorkflowForm
        stepName={'create'}
        startData={startData}
        processDefinitionId={id}
        deploymentId={deploymentId}
        tableHeaderLength={6}
      />
    </React.Fragment>
  )

}

export default Create
