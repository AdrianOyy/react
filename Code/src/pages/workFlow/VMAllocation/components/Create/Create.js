import React, { useEffect, useState } from "react"
import ComplexForm from "../../../../../components/ComplexForm"
import DialogForm from "../../../../../components/DialogForm"
import getLogic from "../../../../../utils/dynamicFormLogic"
import Api from  "../../../../../api/dynamicForm"
import { getQueryString, getUser } from "../../../../../utils/user"
import { useParams, useHistory, useLocation } from "react-router-dom"


function Create(props) {
  const { onMount } = props
  const { id } = useParams()
  const history = useHistory()
  const user = getUser()
  const userId = user.id
  const arr = getQueryString(useLocation().search)
  const deploymentId = arr['deploymentId']

  // const [ dynamicForm, setDynamicForm ] = useState({})
  const [ formKey, setFormKey ] = useState('')
  // const [ sonForm, setSonForm ] = useState({})
  const [ childFormKey, setChildFormKey ] = useState('')
  const [ formProps, setFormProps ] = useState({})
  const [ sonFormProps, setSonFormProps ] = useState({})
  const [ formFieldList, setFormFieldList ] = useState([])
  // const [ formFieldList, setFormFieldList ] = useState([])
  const [ sonFieldList, setSonFieldList ] = useState([])
  const [ sonFormList, setSonFormList ] = useState([])
  const [ open, setOpen ] = useState(false)
  const [ moduleList, setModuleList ] = useState([])

  // 获取渲染表
  useEffect(() => {
    Api.test({ deploymentId }).then(({ data }) => {
      // eslint-disable-next-line no-unused-vars
      const { workflowName, formKey, parentFormDetail, childFormDetail, childFormKey } = data.data
      const logic = getLogic(workflowName)
      setFormKey(formKey)
      setChildFormKey(childFormKey)
      for (const parentForm of parentFormDetail) {
        parentForm.id = parentForm.fieldName
      }
      setFormFieldList(parentFormDetail)
      for (const childForm of childFormDetail) {
        childForm.id = childForm.fieldName
      }
      setSonFieldList(childFormDetail)
      setFormProps({
        type: 'form',
        formFieldList: parentFormDetail,
        onFormFieldChange: async (el, id, i) => {
          const { value } = el.target
          await logic.onFormFieldChange(value, id, i, parentFormDetail)
        }
      })
      setSonFormProps({
        type: 'table',
        formFieldList: childFormDetail,
        onFormFieldChange: async (el, id, i) => {
          const { value } = el.target
          await logic.onDialogFieldChange(value, id, i, childFormDetail)
        },
        checkDialog: async (form) => {
          await logic.checkDialog(form)
        }
      })
    })
    // Api.getDynamicForm({ deploymentId, userId })
    //   .then(({ data }) => {
    //     const { dynamicForm, sonForm, detailList, sonFormList } = data.data
    //     const logic = getLogic(dynamicForm.workflowName)
    //     setDynamicForm(dynamicForm)
    //     setSonForm(sonForm)
    //     setFormFieldList(detailList)
    //     setSonFieldList(sonFormList)
    //     setFormProps({
    //       type: 'form',
    //       formFieldList: detailList,
    //       onFormFieldChange: async (el, id, i) => {
    //         const { value } = el.target
    //         await logic.onFormFieldChange(value, id, i, detailList)
    //       }
    //     })
    //     setSonFormProps({
    //       type: 'table',
    //       formFieldList: sonFormList,
    //       onFormFieldChange: async (el, id, i) => {
    //         const { value } = el.target
    //         await logic.onDialogFieldChange(value, id, i, sonFormList)
    //       },
    //       checkDialog: async (form) => {
    //         await logic.checkDialog(form)
    //       }
    //     })
    //   })
  }, [ deploymentId, userId ])

  const customCreate = () => {
    const values = [ ...sonFormList ]
    for (const value of values) {
      value.value = ''
    }
    setSonFormList(values)
    setOpen(true)
  }

  useEffect(() => {
    const display = []
    const fieldList = []
    const headCells = []
    for (const son of sonFieldList) {
      if (son.showOnRequest) {
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
    }
    const tableProp = {
      type: 'table',
      title: childFormKey ? childFormKey : '',
      headCells,
      fieldList,
      rows: sonFormList,
      customCreate
    }
    display.push(tableProp)
    setModuleList(display)
    // eslint-disable-next-line
  }, [ sonFormList, sonFieldList ])


  // 用于更新面包屑
  useEffect(() => {
    onMount('create')
    // eslint-disable-next-line
  }, [])

  const handleClick = (_, id) => {
    alert(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmitClick = () => {
    const form = {
      formKey,
      deploymentId,
      processDefinitionId: id,
      startUser: getUser().id.toString(),
      formFieldList,
      childFormKey,
      sonDetailList: sonFormList,
      sonFormList: sonFieldList
    }
    console.log(form)
    Api.save(form)
      .then(() => {
        history.push({ pathname: '/' })
      })
  }


  const handleSaveClick = () => {
    const form = {
      id: sonFieldList.length + 1
    }
    for (let i = 0; i < sonFieldList.length; i++) {
      if (sonFieldList[i].type === 'select') {
        const item = sonFieldList[i].itemList.find(t => t[sonFieldList[i].foreignKey] === sonFieldList[i].value)
        form[sonFieldList[i].label] = item ? item[sonFieldList[i].foreignDisplayKey] : sonFieldList[i].value
        form[sonFieldList[i].label + '_svalue'] = sonFieldList[i].value
      } else {
        form[sonFieldList[i].label] = sonFieldList[i].value
      }
    }
    const values = [ ...sonFormList ]
    const pass = sonFormProps.checkDialog(form)

    if (pass) {
      values.push(form)
      setSonFormList(values)
      setOpen(false)
    }
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
        formKey && (
          <ComplexForm
            title={'Form'}
            titleLevel={3}
            moduleList={[ formProps, ...moduleList ]}
            buttonList={buttonList}
          />
        )
      }
      <DialogForm
        title={childFormKey ? childFormKey : ''}
        handleClose={handleClose}
        open={open}
        titleLevel={3}
        formFieldList = {sonFieldList}
        onFormFieldChange = {sonFormProps.onFormFieldChange}
        buttonList={dialogButtonList}
      />
    </React.Fragment>
  )
}

export default Create
