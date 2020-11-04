import React from "react"
import path from '../../../../../utils/path'
import { useParams, useLocation } from "react-router-dom"
import CommonWorkflowForm from "../../../../../components/CommonWorkflowForm"


function Create() {
  const { id } = useParams()
  const arr = path.getQueryString(useLocation().search)
  const deploymentId = arr['deploymentId']
  const cpsId = arr['cpsId']
  const startData = {
    start: false,
    cuId: null,
  }
  if (cpsId) {
    startData.start = true
    startData.cpsId = cpsId
  }
  return (
    <React.Fragment>
      <CommonWorkflowForm
        startData={startData}
        processDefinitionId={id}
        deploymentId={deploymentId}
        tableHeaderLength={6}
      />
    </React.Fragment>
  )

}

export default Create
