import React, { memo } from "react"
import path from '../../../../../utils/path'
import { useParams, useLocation } from "react-router-dom"
import HADynamicForm from "../../../../../components/HADynamicForm"
import { UPDATE } from "../../../../../utils/variable/stepName"
import getStepName from "../../../../../utils/getStepName"

const DynamicForm = memo(HADynamicForm)

function Create() {
  const { id } = useParams()
  const arr = path.getQueryString(useLocation().search)
  const deploymentId = arr['deploymentId']
  const stepName = getStepName(arr['stepName'])
  const pageName = 'myApprove'
  const taskId = arr['taskId']
  return (
    <React.Fragment>
      <DynamicForm
        pid={id}
        stepName={stepName}
        pageName={pageName}
        taskId={taskId}
        deploymentId={deploymentId}
      />
    </React.Fragment>
  )

}

export default Create
