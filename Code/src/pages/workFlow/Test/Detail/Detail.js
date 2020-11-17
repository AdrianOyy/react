import React from 'react'
import HADynamicForm from "../../../../components/HADynamicForm"
import { CREATE, DETAIL } from "../../../../utils/variable/stepName"
import { getQueryString } from "../../../../utils/url"
import { useParams } from "react-router-dom"

console.log(CREATE)
const deploymentId = getQueryString().get('deploymentId')

export default function Detail() {
  const { id } = useParams()
  return (
    <React.Fragment>
      <HADynamicForm
        pid={id}
        cuId={123}
        stepName={DETAIL}
        deploymentId={deploymentId}
      />
    </React.Fragment>
  )
}
