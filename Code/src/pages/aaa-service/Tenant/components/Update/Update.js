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
    if (nameErr || saving) return
    setSaving(true)
    API.update(id, { name, manager_group_id: managerGroupId, supporter_group_id: supporterGroupId })
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
      const { name, code, manager_group_id, supporter_group_id, createdAt, updatedAt } = data.data
      setName(name)
      setCode(code)
      setManagerGroupId(manager_group_id)
      setSupporterGroupId(supporter_group_id)
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
    createdAt, updatedAt, nameError, nameHelperText
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

  const onFormFieldBlur = (_, id) => {
    switch (id) {
      case "name":
        nameCheck()
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
