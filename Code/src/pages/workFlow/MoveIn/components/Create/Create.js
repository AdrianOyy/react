import React from "react"
import path from '../../../../../utils/path'
import { useParams, useLocation } from "react-router-dom"
import CommonWorkflowForm from "../../../../../components/CommonWorkflowForm"


function Create(props) {
  const { id } = useParams()
  const arr = path.getQueryString(useLocation().search)
  const deploymentId = arr['deploymentId']
  const altCheck = arr['altCheck']
  return (
    <React.Fragment>
      <CommonWorkflowForm
        altCheck={altCheck}
        processDefinitionId={id}
        deploymentId={deploymentId}
        tableHeaderLength={6}
      />
    </React.Fragment>
  )

}

export default Create
