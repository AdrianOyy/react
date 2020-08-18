import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenant"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty } from "../../untils/tenantFieldCheck"
import adGroupApi from "../../../../../api/adGroup"


function TenantDetail(props) {
  const { onMount } = props
  const { id } = useParams()
  const history = useHistory()

  const [ code, setCode ] = useState('')
  const [ name, setName ] = useState('')
  const [ managerGroupId, setManagerGroupId ] = useState('')
  const [ supporterGroupId, setSupporterGroupId ] = useState('')
  
  const [ project_code, setproject_code ] = useState('')
  const [ project_codeError, setproject_codeError ] = useState(false)
  const [ project_codeHelperText, setproject_codeHelperText ] = useState("")
  const [ project_name, setproject_name ] = useState('')
  const [ project_nameError, setproject_nameError ] = useState(false)
  const [ project_nameHelperText, setproject_nameHelperText ] = useState("")
  const [ justification, setjustification ] = useState('')
  const [ justificationError, setjustificationError ] = useState(false)
  const [ justificationHelperText, setjustificationHelperText ] = useState("")
  const [ budget_type, setbudget_type ] = useState('')
  const [ budget_typeError, setbudget_typeError ] = useState(false)
  const [ budget_typeHelperText, setbudget_typeHelperText ] = useState("")
  const [ project_owner, setproject_owner ] = useState('')
  const [ project_ownerError, setproject_ownerError ] = useState(false)
  const [ project_ownerHelperText, setproject_ownerHelperText ] = useState("")
  const [ contact_person, setcontact_person ] = useState('')
  const [ contact_personError, setcontact_personError ] = useState(false)
  const [ contact_personHelperText, setcontact_personHelperText ] = useState("")
  const [ project_estimation, setproject_estimation ] = useState('')
  const [ project_estimationError, setproject_estimationError ] = useState(false)
  const [ project_estimationHelperText, setproject_estimationHelperText ] = useState("")
  const [ methodology_text, setmethodology_text ] = useState('')
  const [ methodology_textError, setmethodology_textError ] = useState(false)
  const [ methodology_textHelperText, setmethodology_textHelperText ] = useState("")

  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdatedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ nameError, setNameError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")
  const [ groupList, setGroupList ] = useState([])

  useEffect(() => {
    onMount('update')
    // eslint-disable-next-line
  }, [])

  // 获取 groupList
  useEffect(() => {
    adGroupApi.list({ limit: 999, page: 1 })
      .then(({ data }) => {
        if (data && data.data) {
          const { rows } = data.data
          setGroupList(rows)
        }
      })
  }, [])

  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }

  const handleClick = async () => {
    const nameErr = await nameCheck()
    const project_codeErr = await project_codeCheck()
    const project_nameErr = await project_nameCheck()
    const justificationErr = await justificationCheck()
    const budget_typeErr = await budget_typeCheck()
    const project_ownerErr = await project_ownerCheck()
    const contact_personErr = await contact_personCheck()
    const project_estimatioErr = await project_estimationCheck()
    const methodology_textErr = await methodology_textCheck()
    if ( nameErr || project_codeErr || project_nameErr
     || justificationErr || budget_typeErr || project_ownerErr
     || contact_personErr || project_estimatioErr || methodology_textErr
     || saving ) { 
       return
     }
    setSaving(true)
    API.update(id,
      { name,
        manager_group_id: managerGroupId,
        supporter_group_id: supporterGroupId,
        project_code, project_name, justification,
        budget_type, project_owner, contact_person,
        project_estimation, methodology_text
      })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: '/aaa-service/tenant' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      const {
        name, code, manager_group_id, supporter_group_id,
        project_code, project_name, justification,
        budget_type, project_owner, contact_person,
        project_estimation, methodology_text,
        createdAt, updatedAt
      } = data.data
      setName(name)
      setCode(code)
      setManagerGroupId(manager_group_id)
      setSupporterGroupId(supporter_group_id)
      setproject_code(project_code)
      setproject_name(project_name)
      setjustification(justification)
      setbudget_type(budget_type)
      setproject_owner(project_owner)
      setcontact_person(contact_person)
      setproject_estimation(project_estimation)
      setmethodology_text(methodology_text)
      setCreatedAt(createdAt)
      setUpdatedAt(updatedAt)
      setSaving(false)
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      {
        id: 'code', label: 'Code', type: 'text', readOnly: true, disabled: true, value: code,
      },
      {
        id: 'name', label: 'Name', type: 'text', required: true, readOnly: false,
        value: name, error: nameError, helperText: nameHelperText
      },
      {
        id: 'managerGroupId', label: 'Manager Group', type: 'text', isSelector: true,
        readOnly: false, itemList: groupList, value: managerGroupId,
        labelField: 'name', valueField: 'id',
      },
      {
        id: 'supporterGroupId', label: 'Supporter Group', type: 'text', isSelector: true,
        readOnly: false, itemList: groupList, value: supporterGroupId,
        labelField: 'name', valueField: 'id',
      },
      {
        id: 'project_code', label: 'Project Code', type: 'text', required: true, readOnly: false,
        value: project_code,
        error: project_codeError, helperText: project_codeHelperText
      },
      {
        id: 'project_name', label: 'project_name', type: 'text', required: true, readOnly: false,
        value: project_name,
        error: project_nameError, helperText: project_nameHelperText
      },
      {
        id: 'justification', label: 'justification', type: 'text', required: true, readOnly: false,
        value: justification,
        error: justificationError, helperText: justificationHelperText
      },
      {
        id: 'budget_type', label: 'budget_type', type: 'text', required: true, readOnly: false,
        value: budget_type,
        error: budget_typeError, helperText: budget_typeHelperText
      },
      {
        id: 'project_owner', label: 'project_owner', type: 'text', required: true, readOnly: false,
        value: project_owner,
        error: project_ownerError, helperText: project_ownerHelperText
      },
      {
        id: 'contact_person', label: 'contact_person', type: 'text', required: true, readOnly: false,
        value: contact_person,
        error: contact_personError, helperText: contact_personHelperText
      },
      {
        id: 'project_estimation', label: 'project_estimation', type: 'text', required: true, readOnly: false,
        value: project_estimation,
        error: project_estimationError, helperText: project_estimationHelperText
      },
      {
        id: 'methodology_text', label: 'methodology_text', type: 'text', required: true, readOnly: false,
        value: methodology_text,
        error: methodology_textError, helperText: methodology_textHelperText
      },
      {
        id: 'createdAt', label: 'Created At', type: 'text', disabled: true,
        readOnly: true, value: formatDateTime(createdAt)
      },
      {
        id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true,
        readOnly: true, value: formatDateTime(updatedAt)
      },
    ]
    setFormFieldList(list)
  }, [
    name, code, managerGroupId, supporterGroupId, groupList,
    project_code, project_name, justification,
    budget_type, project_owner, contact_person,
    project_estimation, methodology_text,
    createdAt, updatedAt, nameError, nameHelperText,
    project_codeError, project_codeHelperText,
    project_nameError, project_nameHelperText,
    justificationError, justificationHelperText,
    budget_typeError, budget_typeHelperText,
    project_ownerError, project_ownerHelperText,
    contact_personError, contact_personHelperText,
    project_estimationError, project_estimationHelperText,
    methodology_textError, methodology_textHelperText,
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'name':
        setName(value)
        break
      case 'managerGroupId':
        setManagerGroupId(value)
        break
      case 'supporterGroupId':
        setSupporterGroupId(value)
        break
      case 'project_code':
        setproject_code(value)
        break
      case 'project_name':
        setproject_name(value)
        break
      case 'justification':
        setjustification(value)
        break
      case 'budget_type':
        setbudget_type(value)
        break
      case 'project_owner':
        setproject_owner(value)
        break
      case 'contact_person':
        setcontact_person(value)
        break
      case 'project_estimation':
        setproject_estimation(value)
        break
      case 'methodology_text':
        setmethodology_text(value)
        break
      default:
        break
    }
  }

  const nameCheck = async () => {
    const emptyCheck = checkEmpty("name", name)
    setNameError(emptyCheck.error)
    setNameHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const project_codeCheck = async () => {
    const emptyCheck = checkEmpty("project_code", project_code)
    setproject_codeError(emptyCheck.error)
    setproject_codeHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const project_nameCheck = async () => {
    const emptyCheck = checkEmpty("project_name", project_name)
    setproject_nameError(emptyCheck.error)
    setproject_nameHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const justificationCheck = async () => {
    const emptyCheck = checkEmpty("justification", justification)
    setjustificationError(emptyCheck.error)
    setjustificationHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const budget_typeCheck = async () => {
    const emptyCheck = checkEmpty("budget_type", budget_type)
    setbudget_typeError(emptyCheck.error)
    setbudget_typeHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const project_ownerCheck = async () => {
    const emptyCheck = checkEmpty("project_owner", project_owner)
    setproject_ownerError(emptyCheck.error)
    setproject_ownerHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const contact_personCheck = async () => {
    const emptyCheck = checkEmpty("contact_person", contact_person)
    setcontact_personError(emptyCheck.error)
    setcontact_personHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const project_estimationCheck = async () => {
    const emptyCheck = checkEmpty("project_estimation", project_estimation)
    setproject_estimationError(emptyCheck.error)
    setproject_estimationHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const methodology_textCheck = async () => {
    const emptyCheck = checkEmpty("methodology_text", methodology_text)
    setmethodology_textError(emptyCheck.error)
    setmethodology_textHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const onFormFieldBlur = (_, id) => {
    switch (id) {
      case "name":
        nameCheck()
        break
      case "project_code":
        project_codeCheck()
        break
      case "project_name":
        project_nameCheck()
        break
      case "justification":
        justificationCheck()
        break
      case "budget_type":
        budget_typeCheck()
        break
      case "project_owner":
        project_ownerCheck()
        break
      case "contact_person":
        contact_personCheck()
        break
      case "project_estimation":
        project_estimationCheck()
        break
      case "methodology_text":
        methodology_textCheck()
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Tenant Update'
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default TenantDetail
