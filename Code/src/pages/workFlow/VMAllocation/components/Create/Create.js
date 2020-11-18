import React, { memo } from "react"
import path from '../../../../../utils/path'
import { useParams, useLocation } from "react-router-dom"
// import CommonWorkflowForm from "../../../../../components/CommonWorkflowForm"
import HADynamicForm from "../../../../../components/HADynamicForm"
import { CREATE } from "../../../../../utils/variable/stepName"

const DynamicForm = memo(HADynamicForm)

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
      <DynamicForm
        stepName={CREATE}
        startData={startData}
        processDefinitionId={id}
        deploymentId={deploymentId}
      />
    </React.Fragment>
  )

}

export default Create
