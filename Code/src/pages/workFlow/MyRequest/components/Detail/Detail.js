import React, { memo } from "react"
import path from '../../../../../utils/path'
import { useParams, useLocation } from "react-router-dom"
import HADynamicForm from "../../../../../components/HADynamicForm"
import { DETAIL } from "../../../../../utils/variable/stepName"

const DynamicForm = memo(HADynamicForm)

function Create() {
  const { id } = useParams()
  const arr = path.getQueryString(useLocation().search)
  const deploymentId = arr['deploymentId']
  return (
    <React.Fragment>
      <DynamicForm
        pid={id}
        stepName={DETAIL}
        deploymentId={deploymentId}
      />
    </React.Fragment>
  )

}

export default Create
