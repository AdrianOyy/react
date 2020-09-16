import React, { useEffect } from "react"
import path from '../../../../../utils/path'
import { useParams, useLocation } from "react-router-dom"
import CommonWorkflowForm from "../../../../../components/CommonWorkflowForm"


function Create(props) {
  const { onMount } = props
  const { id } = useParams()
  const arr = path.getQueryString(useLocation().search)
  const deploymentId = arr['deploymentId']
  const stepName = arr['stepName']
  const pageName = 'myApprove'
  const taskId = arr['taskId']
  // 用于更新面包屑
  useEffect(() => {
    onMount('Detail')
    // eslint-disable-next-line
  }, [])
  return (
    <React.Fragment>
      <CommonWorkflowForm
        pid={id}
        stepName={stepName}
        pageName={pageName}
        taskId={taskId}
        deploymentId={deploymentId}
        tableHeaderLength={6}
      />
    </React.Fragment>
  )

}

export default Create
