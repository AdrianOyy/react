import React, { useState, useEffect } from "react"
import Api from "../../../api/dynamicForm"
import DiyForm from "../../../components/DIYForm"

const did = 615083

function Test() {
  const [ formKey, setFormKey ] = useState('')
  const [ workflowName, setWorkflowName ] = useState('')
  const [ parentFormDetail, setParentFormDetail ] = useState({})
  const [ childFormDetail, setChildFormDetail ] = useState({})

  // 获取渲染表
  useEffect(() => {
    Api.test({ formKey: 'VMAllocation', formId: 1 }).then(() => {})
    // Api.test({ deploymentId: did })
    //   .then(({ data }) => {
    //     console.log('data.data ================= data.data')
    //     console.log(data.data)
    //     console.log('data.data ================= data.data')
    //     const { workflowName, formKey, parentFormDetail, childFormDetail } = data.data
    //     setFormKey(formKey)
    //     setWorkflowName(workflowName)
    //     setParentFormDetail(parentFormDetail)
    //     if (childFormDetail && childFormDetail.length > 0) {
    //       setChildFormDetail(childFormDetail)
    //     }
    //   })
  }, [])

  useEffect(() => {
    console.log('parentFormDetail ================= parentFormDetail')
    console.log(parentFormDetail)
    console.log('parentFormDetail ================= parentFormDetail')
  }, [ parentFormDetail ])

  useEffect(() => {
    console.log('childFormDetail ================= childFormDetail')
    console.log(childFormDetail)
    console.log('childFormDetail ================= childFormDetail')
  }, [ childFormDetail ])

  return (
    <React.Fragment>
      <DiyForm />
    </React.Fragment>
  )
}

export default Test
