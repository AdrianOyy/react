import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenant"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/tenantFieldCheck"
import adGroupApi from "../../../../../api/adGroup"

function Create(props) {
  const { onMount } = props
  const history = useHistory()
  const [ name, setName ] = useState('')
  const [ code, setCode ] = useState('')
  const [ managerGroupId, setManagerGroupId ] = useState('')
  const [ supporterGroupId, setSupporterGroupId ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ nameError, setNameError ] = useState(false)
  const [ codeError, setCodeError ] = useState(false)
  const [ managerGroupIdError, setManagerGroupIdError ] = useState(false)
  const [ supporterGroupIdError, setSupporterGroupIdError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")
  const [ codeHelperText, setCodeHelperText ] = useState("")
  const [ managerGroupIdHelperText, setManagerGroupIdHelperText ] = useState("")
  const [ supporterGroupIdHelperText, setSupporterGroupIdHelperText ] = useState("")
  const [ groupList, setGroupList ] = useState([])
  const [ nameInit, setNameInit ] = useState(false)
  const [ codeInit, setCodeInit ] = useState(false)
  const [ managerGroupIdInit, setManagerGroupIdInit ] = useState(false)
  const [ supporterGroupIdInit, setSupporterGroupIdInit ] = useState(false)

  useEffect(() => {
    onMount('create')
    // eslint-disable-next-line
  }, [])

  // 获取 groupList
  useEffect(() => {
    adGroupApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setGroupList(rows)
      }
    })
  }, [])

  const handleClick = async () => {
    const nameErr = await nameCheck()
    const codeErr = await codeCheck()
    const manaErr = await managerGroupCheck()
    const suppErr = await supporterGroupCheck()
    if (nameErr || codeErr || manaErr || suppErr || saving) return
    setSaving(true)
    API.create({ name, code, manager_group_id: managerGroupId, supporter_group_id: supporterGroupId })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: '/aaa-service/tenant' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    const list = [
      {
        id: 'code', label: 'Code', type: 'text', required: true, readOnly: false,
        value: code, error: codeError, helperText: codeHelperText
      },
      {
        id: 'name', label: 'Name', type: 'text', required: true, readOnly: false,
        value: name, error: nameError, helperText: nameHelperText
      },
      {
        id: 'managerGroupId', label: 'Manager Group', required: true, itemList: groupList,
        isSelector: true, labelField: 'name', valueField: 'id', value: managerGroupId,
        error: managerGroupIdError, helperText: managerGroupIdHelperText, width: 1.2, labelWidth: 104
      },
      {
        id: 'supporterGroupId', label: 'Supporter Group', required: true, itemList: groupList,
        isSelector: true, labelField: 'name', valueField: 'id', value: supporterGroupId,
        error: supporterGroupIdError, helperText: supporterGroupIdHelperText, width: 1.2, labelWidth: 108
      },
    ]
    setFormFieldList(list)
  }, [ name, nameError, nameHelperText, code, codeError, groupList,
    codeHelperText, managerGroupId, managerGroupIdError, managerGroupIdHelperText,
    supporterGroupId, supporterGroupIdError, supporterGroupIdHelperText,
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'name':
        setName(value)
        break
      case 'code':
        setCode(value)
        break
      case 'managerGroupId':
        setManagerGroupId(value)
        break
      case 'supporterGroupId':
        setSupporterGroupId(value)
        break
      default:
        break
    }
  }

  const nameCheck = async () => {
    const emptyCheck = checkEmpty("Name", name)
    setNameError(emptyCheck.error)
    setNameHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, name)
      setNameError(error)
      setNameHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const codeCheck = async () => {
    const emptyCheck = checkEmpty("Code", code)
    setCodeError(emptyCheck.error)
    setCodeHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, code)
      setCodeError(error)
      setCodeHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const managerGroupCheck = async () => {
    const emptyCheck = checkEmpty("Manager Group", managerGroupId)
    setManagerGroupIdError(emptyCheck.error)
    setManagerGroupIdHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const supporterGroupCheck = async () => {
    const emptyCheck = checkEmpty("Supporter Group", supporterGroupId)
    setSupporterGroupIdError(emptyCheck.error)
    setSupporterGroupIdHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  useEffect(() => {
    if (nameInit) {
      nameCheck()
    } else {
      setNameInit(true)
    }
    // eslint-disable-next-line
  }, [name])

  useEffect(() => {
    if (codeInit) {
      codeCheck()
    } else {
      setCodeInit(true)
    }
    // eslint-disable-next-line
  }, [code])

  useEffect(() => {
    if (managerGroupIdInit) {
      managerGroupCheck()
    } else {
      setManagerGroupIdInit(true)
    }
    // eslint-disable-next-line
  }, [managerGroupId])

  useEffect(() => {
    if (supporterGroupIdInit) {
      supporterGroupCheck()
    } else {
      setSupporterGroupIdInit(true)
    }
    // eslint-disable-next-line
  }, [supporterGroupId])

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Tenant Create'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Create
