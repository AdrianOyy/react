import React, { useState, useEffect } from "react"
import Api from "../../../api/dynamicForm"

function Test() {
  const [ deploymentId, setDeploymentId ] = useState(0)
  const [ formKey, setFormKey ] = useState('')
  const [ workflowName, setWorkflowName ] = useState('')
  const [ parentFormDetail, setParentFormDetail ] = useState({})
  const [ sonFormKey, setSonFormKey ] = useState('')
  const [ sonFormDetail, setSonFormDetail ] = useState({})
  // 获取渲染表
  useEffect(() => {
    Api.test({ deploymentId: 7501 })
      .then(({ data }) => {
        console.log('data ================= data')
        console.log(data.data)
        console.log('data ================= data')
        const { deploymentId, formKey, workflowName, dynamicFormDetail, childTable, } = data.data
        setDeploymentId(deploymentId)
        setFormKey(formKey)
        setWorkflowName(workflowName)
        setParentFormDetail(dynamicFormDetail)
        if (childTable && childTable.length > 0) {
          setSonFormKey(childTable[0].formKey)
          setSonFormDetail(childTable[0].dynamicFormDetail)
        }
      })
  }, [])
  return (
    <React.Fragment>
      <div>
        hi
      </div>
    </React.Fragment>
  )
}

export default Test
