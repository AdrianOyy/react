import React, { useEffect, useState } from "react"
import ComplexForm from "../../../../../components/ComplexForm"
import DialogForm from "../../../../../components/DialogForm"
import Api from  "../../../../../api/dynamicForm"
import { useParams, useHistory, useLocation } from "react-router-dom"
import deepClone from "../../../../../utils/deepClone"
import getLogic from "../../../../../utils/dynamicFormLogic"
import { getQueryString, getUser } from "../../../../../utils/user"



function Create(props) {
  const { onMount } = props
  const { id } = useParams()
  const history = useHistory()
  const user = getUser()
  const userId = user.id
  const arr = getQueryString(useLocation().search)
  const deploymentId = arr['deploymentId']
  const [ open, setOpen ] = useState(false)
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ dynamicForm, setDynamicForm ] = useState(null)
  const [ sonForm, setSonForm ] = useState(null)
  const [ logic, setLogic ] = useState(null)
  const [ sonFormList, setSonFormList ] = useState([])
  const [ sonDetailList, setSonDetailList ] = useState([])
  const [ moduleList, setModuleList ] = useState([])
  const onFormFieldChange = async (e, id) => {
    if (logic) {
      const newValue = await logic.onFormFieldChange(e, id, deepClone(formFieldList))
      setFormFieldList(newValue)
    }
  }

  // 用于更新面包屑
  useEffect(() => {
    onMount('create')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    Api.getDynamicForm({ deploymentId, userId })
      .then(({ data }) => {
        const dyform = data.data
        setDynamicForm(dyform.dynamicForm)
        setFormFieldList(dyform.detailList)
        setSonForm(dyform.sonForm)
        setSonFormList(dyform.sonFormList)
        setSonDetailList(dyform.sonDetailList)
        // DialogField(dyform.dynamicSon, dyform.sonList)
      })
  }, [ deploymentId, userId ])

  useEffect(() => {
    if (dynamicForm && dynamicForm.formKey) {
      setLogic(getLogic(dynamicForm.formKey))
    }
  }, dynamicForm)

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
      title: sonForm ? sonForm.formKey : '',
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
    const values = deepClone(sonFormList)
    for (const value of values) {
      value.value = ''
    }
    setSonFormList(values)
    setOpen(true)
  }

  const  handleClose = () => {
    setOpen(false)
    // const values = deepClone(sonDetailList)
    // for (const value of values) {
    //   value.value = ''
    // }
    // setSonDetailList(values)
  }

  const handleSaveClick = async () => {
    const form = {
      id: sonFormList.length + 1
    }
    for (let i = 0; i < sonFormList.length; i++) {
      form[sonFormList[i].label] = sonFormList[i].value
    }
    const values = deepClone(sonDetailList)
    const pass = await logic.checkDialog(form)
    if (pass) {
      values.push(form)
      setSonDetailList(values)
      setOpen(false)
    }
  }

  const onDialogFieldChange = async (e, id) => {
    if (logic) {
      const newValue = await logic.onDialogFieldChange(e, id, deepClone(sonFormList))
      setSonFormList(newValue)
    }
  }

  const handleSubmitClick = () => {
    const form = {
      dynamicForm,
      deploymentId,
      processDefinitionId: id,
      startUser: getUser().id.toString(),
      formFieldList,
      sonForm,
      sonDetailList,
      sonFormList
    }
    Api.save(form)
      .then(() => {
        history.push({ pathname: `/workflow/vm` })
      })
  }

  const handleClick = (_, id) => {
    alert(id)
  }

  const buttonList = [
    { id: 'check', label: 'Check', color: 'primary', onClick: handleClick, disabled: false },
    { id: 'submit', label: 'Submit', color: 'secondary', onClick: handleSubmitClick, disabled: false },
    { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClick, disabled: false },
  ]

  const dialogButtonList = [
    { id: 'save', label: 'Save', color: 'primary', onClick: handleSaveClick, disabled: false },
    { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClose, disabled: false },
  ]

  return (
    <React.Fragment>
      {
        dynamicForm && dynamicForm.formKey && (
          <ComplexForm
            title={dynamicForm ? dynamicForm.formKey : ''}
            formKey={dynamicForm ? dynamicForm.formKey : ''}
            titleLevel={1}
            moduleList={[ formProp, ...moduleList ]}
            buttonList={buttonList}
          />
        )
      }

      <DialogForm
        title={sonForm ? sonForm.formKey : ''}
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
