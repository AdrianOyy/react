import React from "react"
import path from '../../../../../utils/path'
import { useParams, useLocation } from "react-router-dom"
import CommonWorkflowForm from "../../../../../components/CommonWorkflowForm"


function Create() {
  const { id } = useParams()
  const arr = path.getQueryString(useLocation().search)
  const deploymentId = arr['deploymentId']
  const stepName = arr['stepName']
  const pageName = 'myApprove'
  const taskId = arr['taskId']
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
