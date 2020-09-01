import React, { useEffect, useState } from "react"
import ComplexForm from "../../../../../components/ComplexForm"
import DialogForm from "../../../../../components/DialogForm"
import Api from  "../../../../../api/dynamicForm"
import workflowApi from  "../../../../../api/workFlow"
import { useParams, useHistory, useLocation } from "react-router-dom"
import deepClone from "../../../../../utils/deepClone"
import { getUser, getQueryString } from "../../../../../utils/user"
import dayjs from "dayjs"
import { BorderColorOutlined as BorderColorIcon } from "@material-ui/icons"

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
  const [ index, setIndex ] = useState(0)
  // const [ dynamicForm, setDynamicForm ] = useState(null)
  const [ sonForm, setSonForm ] = useState(null)
  const [ sonFormList, setSonFormList ] = useState([])
  const [ sonDetailList, setSonDetailList ] = useState([])
  const [ moduleList, setModuleList ] = useState([])
  const [ buttonList, setButtonList ] = useState([])
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
    workflowApi.getStartFormKeyAndDeploymentId({ taskId: id, processDefinitionId })
      .then(({ data }) => {
        console.log(data)
        const tempButtonList = [
          {
            id: 'reject', label: 'Reject', color: 'primary',
            onClick: handleRejectTaskClick, disabled: false
          },
          {
            id: 'pass', label: 'Pass', color: 'secondary',
            onClick: handleAgrreTaskClick, disabled: false
          },
          {
            id: 'cancel', label: 'Cancel', color: 'default',
            onClick: handleClick, disabled: false
          },
        ]
        if (data && data.data && data.data.name === 'T3 adjust VM infomation') {

          tempButtonList.push(
            {
              id: 'T1', label: 'T1 Follow Up', color: 'secondary',
              onClick: handleT1FollowUpClick, disabled: false
            },
            {
              id: 'T2', label: 'T2 Follow Up', color: 'secondary',
              onClick: handleT2FollowUpClick, disabled: false
            },
            {
              id: 'T6', label: 'T6 Follow Up', color: 'secondary',
              onClick: handleT6FollowUpClick, disabled: false
            },
          )
        }
        setButtonList(tempButtonList)
        const key = data.data
        Api.getDynamicFormDetail({ deploymentId: key.deploymentId, formId: key.formId, userId }).then(({ data }) => {
          const dyform = data.data
          // setDynamicForm(dyform.dynamicForm)
          setFormFieldList(dyform.detailList)
          setSonForm(dyform.sonForm)
          setSonFormList(dyform.sonFormList)
          setSonDetailList(dyform.sonDetailList)
          // DialogField(dyform.dynamicSon, dyform.sonList)
        })
      })
  // eslint-disable-next-line
  }, [ id, processDefinitionId, userId ])

  const handleEditDetail = (event, index) => {
    setIndex(index)
    const sonDetail = sonDetailList[index]
    const values = deepClone(sonFormList)
    for (const value of values) {
      if (value.type === 'select') {
        value.value = sonDetail[value.label + '_svalue']
      } else {
        value.value = sonDetail[value.label]
      }
    }
    setSonFormList(values)
    setOpen(true)
  }

  // 自定义action
  const actionList = [
    { label: 'edit', icon: <BorderColorIcon />, handleClick: handleEditDetail  },
  ]

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
    headCells.push({
      id: 'action',
      alignment: 'right',
      label: 'action'
    })
    const tableProp = {
      type: 'table',
      headCells,
      fieldList,
      rows: sonDetailList,
      hideCreate: true,
      actionList,
      // customCreate
    }
    display.push(tableProp)
    setModuleList(display)
  }, [ sonForm, sonFormList, sonDetailList ])

  const formProp = {
    type: 'form',
    // title: dynamicForm ? dynamicForm.formKey + ' Form' : '',
    title: 'VM',
    titleLevel: 3,
    isCommon: true,
    formFieldList,
    onFormFieldChange
  }

  // const customCreate = () => {
  //   setOpen(true)
  // }

  const  handleClose = () => {
    setOpen(false)
  }

  const handleSaveClick = () => {
    setOpen(false)
    const values = deepClone(sonDetailList)
    const sonDetail = values[index]
    for (const from of sonFormList) {
      if (from.type === 'select') {
        const item = from.itemList.find(t => t[from.foreignKey] === from.value)
        sonDetail[from.label]  = item ? item[from.foreignDisplayKey] : from.value
        sonDetail[from.label + '_svalue'] = from.value
      } else  {
        sonDetail[from.label] = from.value
      }

      // if (value.type === 'select') {
      //   value.value = parseInt(sonDetail[value.label])
      // } else {
      //   value.value = sonDetail[value.label]
      // }
    }
    console.log(values)
    setSonDetailList(values)
    // const form = {
    //   id: sonFormList.length + 1
    // }
    // for (let i = 0; i < sonFormList.length; i++) {
    //   form[sonDetailList[i].label] = sonFormList[i].value
    // }
    // const values = deepClone(sonDetailList)
    // values.push(form)
    // setSonDetailList(values)
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

  const handleClick = () => {
    history.push({ pathname: `/MyApproval` })
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

  const handleT1FollowUpClick = () => {
    // const data = {
    //   taskId: id,
    //   variables: { followUp: 'T1' },
    // }
    alert('T1 followUp')
  }
  const handleT2FollowUpClick = () => {
    alert('T2 followUp')
  }
  const handleT6FollowUpClick = () => {
    alert('T6 followUp')
  }

  // const buttonList = [
  //   { id: 'reject', label: 'Reject', color: 'primary', onClick: handleRejectTaskClick, disabled: false },
  //   { id: 'pass', label: 'Pass', color: 'secondary', onClick: handleAgrreTaskClick, disabled: false },
  //   { id: 'T1', label: 'T1 Follow Up', color: 'secondary', onClick: handleT1FollowUpClick, disabled: false },
  //   { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClick, disabled: false },
  // ]

  const dialogButtonList = [
    { id: 'save', label: 'Save', color: 'primary', onClick: handleSaveClick, disabled: false },
    { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClose, disabled: false },
  ]

  return (
    <React.Fragment>
      <ComplexForm
        // title={dynamicForm ? dynamicForm.formKey : ''}
        title={'VM'}
        titleLevel={1}
        moduleList={[ formProp, ...moduleList ]}
        buttonList={buttonList}
      />
      <DialogForm
        // title={'text'}
        title={'VM'}
        handleClose={handleClose}
        open={open}
        titleLevel={1}
        isAll={true}
        formFieldList = {sonFormList}
        onFormFieldChange = {onDialogFieldChange}
        buttonList={dialogButtonList}
      />
    </React.Fragment>
  )
}
export default Create
