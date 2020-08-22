import React, { useEffect, useState } from "react"
import ComplexForm from "../../../../../components/ComplexForm"
import DialogForm from "../../../../../components/DialogForm"
import Api from  "../../../../../api/dynamicForm"
import workflowApi from  "../../../../../api/workFlow"
import { useParams, useHistory, useLocation } from "react-router-dom"
import deepClone from "../../../../../utils/deepClone"
import { getUser, getQueryString } from "../../../../../utils/user"
import dayjs from "dayjs"

const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
}

function Create() {
  const { id } = useParams()
  const history = useHistory()
  const user = getUser()
  const userId = user.id
  const arr = getQueryString(useLocation().search)
  const processDefinitionId = arr['processDefinitionId']
  const [ open, setOpen ] = useState(false)
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ dynamicForm, setDynamicForm ] = useState(null)
  const [ sonForm, setSonForm ] = useState(null)
  const [ sonFormList, setSonFormList ] = useState([])
  const [ sonDetailList, setSonDetailList ] = useState([])
  const [ moduleList, setModuleList ] = useState([])
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    const values = deepClone(formFieldList)
    for (let i = 0; i < values.length; i++) {
      if (values[i].id === id) {
        if (values[i].type === 'date') {
          values[i].value = formatDateTime(value)
        } else {
          values[i].value = value
        }
      }
    }
    setFormFieldList(values)
  }

  useEffect(() => {
    workflowApi.getStartFormKeyAndDeploymentId({ taskId: id, processDefinitionId }).then(({ data }) => {
      console.log(data)
      const key = data.data
      Api.getDynamicFormDetail({ deploymentId: key.deploymentId, formId: key.formId, userId }).then(({ data }) => {
        const dyform = data.data
        setDynamicForm(dyform.dynamicForm)
        setFormFieldList(dyform.detailList)
        setSonForm(dyform.sonForm)
        setSonFormList(dyform.sonFormList)
        setSonDetailList(dyform.sonDetailList)
        // DialogField(dyform.dynamicSon, dyform.sonList)
      })
    })
  }, [ id, processDefinitionId, userId ])

  useEffect(() => {
    const display = []
    const fieldList = []
    const headCells = []
    for (const son of sonFormList) {
      const head = {
        id: son.label,
        alignment: 'center',
        label: son.label
      }
      const field = {
        field: son.label,
        align: 'center'
      }
      headCells.push(head)
      fieldList.push(field)
    }
    const tableProp = {
      type: 'table',
      headCells,
      fieldList,
      rows: sonDetailList,
      customCreate
    }
    display.push(tableProp)
    setModuleList(display)
  }, [ sonForm, sonFormList, sonDetailList ])

  const formProp = {
    type: 'form',
    title: dynamicForm ? dynamicForm.formKey + ' Form' : '',
    titleLevel: 3,
    formFieldList,
    onFormFieldChange
  }

  const customCreate = () => {
    setOpen(true)
  }

  const  handleClose = () => {
    setOpen(false)
  }

  const handleSaveClick = () => {
    setOpen(false)
    const form = {
      id: sonFormList.length + 1
    }
    console.log(sonFormList)
    for (let i = 0; i < sonFormList.length; i++) {
      form[sonFormList[i].label] = sonFormList[i].value
    }
    const values = deepClone(sonDetailList)
    values.push(form)
    console.log(values)
    setSonDetailList(values)
  }

  const onDialogFieldChange = (e, id) => {
    const { value } = e.target
    const values = deepClone(sonFormList)
    console.log(values)
    for (let i = 0; i < values.length; i++) {
      if (values[i].id === id) {
        if (values[i].type === 'date') {
          values[i].value = formatDateTime(value)
        } else {
          values[i].value = value
        }
      }
    }
    console.log(values)
    setSonFormList(values)
  }

  // const handleSubmitClick = () => {
  //   const form = {
  //     dynamicForm,
  //     deploymentId,
  //     processDefinitionId: id,
  //     startUser: getUser().id.toString(),
  //     formFieldList,
  //     sonForm,
  //     sonDetailList,
  //     sonFormList
  //   }
  //   Api.save(form).then(() => {
  //     history.push({ pathname: `/workflow/vm` })
  //   })
  // }

  const handleClick = (_, id) => {
    alert(id)
  }

  const handleRejectTaskClick = () => {
    const data = {
      taskId: id,
      variables: { leaderCheck: false },
    }
    workflowApi.actionTask(data).then(() => {
      history.push({ pathname: `/MyApproval` })
    })
  }

  const handleAgrreTaskClick = () => {
    const data = {
      taskId: id,
      variables: { leaderCheck: true },
    }
    workflowApi.actionTask(data).then(() => {
      history.push({ pathname: `/MyApproval` })
    })
  }

  const buttonList = [
    { id: 'reject', label: 'reject', color: 'primary', onClick: handleRejectTaskClick, disabled: false },
    { id: 'agree', label: 'agree', color: 'secondary', onClick: handleAgrreTaskClick, disabled: false },
    { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClick, disabled: false },
  ]

  const dialogButtonList = [
    { id: 'save', label: 'Save', color: 'primary', onClick: handleSaveClick, disabled: false },
    { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClose, disabled: false },
  ]

  return (
    <React.Fragment>
      <ComplexForm
        title={dynamicForm ? dynamicForm.formKey : ''}
        titleLevel={1}
        moduleList={[ formProp, ...moduleList ]}
        buttonList={buttonList}
      />
      <DialogForm
        title={'text'}
        handleClose={handleClose}
        open={open}
        titleLevel={1}
        formFieldList = {sonFormList}
        onFormFieldChange = {onDialogFieldChange}
        buttonList={dialogButtonList}
      />
    </React.Fragment>
  )
}
export default Create
