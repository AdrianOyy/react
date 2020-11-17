import React, { memo } from "react"
import path from '../../../../../utils/path'
import { useParams, useLocation } from "react-router-dom"
import HADynamicForm from "../../../../../components/HADynamicForm"
import { CREATE } from "../../../../../utils/variable/stepName"

const DynamicForm = memo(HADynamicForm)

function Create() {
  const { id } = useParams()
  const arr = path.getQueryString(useLocation().search)
  const deploymentId = arr['deploymentId']
  // const altCheck = arr['altCheck']
  return (
    <React.Fragment>
      <DynamicForm
        processDefinitionId={id}
        deploymentId={deploymentId}
        stepName={CREATE}
      />
    </React.Fragment>
  )

}

export default Create
