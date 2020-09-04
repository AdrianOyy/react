import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenantGroupMapping"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/TenantGroupMappingFieldCheck"
import tenantApi from "../../../../../api/tenant"
import adGroupApi from "../../../../../api/adGroup"


function TenantGroupMappingCreate(props) {
  const { onMount } = props
  const history = useHistory()
  const [ tenantId, setTenantId ] = React.useState('')
  const [ groupId, setGroupId ] = React.useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ tenantError, setTenantError ] = useState(false)
  const [ groupError, setGroupError ] = useState(false)
  const [ tenantHelperText, setTenantHelperText ] = useState("")
  const [ groupHelperText, setGroupHelperText ] = useState("")
  const [ tenantList, setTenantList ] = useState([])
  const [ adGroupList, setAdGroupList ] = useState([])
  const [ tenantInit, setTenantInit ] = useState(false)
  const [ groupInit, setGroupInit ] = useState(false)

  useEffect(() => {
    onMount('create')
    // eslint-disable-next-line
  }, [])

  const handleClick = async () => {
    const tenantError = await tenantCheck()
    const adGroupError = await groupCheck()
    if (tenantError || adGroupError || saving) return
    setSaving(true)
    API.create({ tenantId, groupId })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: '/aaa-service/tenantAdGroupMapping' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  // 获取 tenantList 和 groupList
  useEffect(() => {
    tenantApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setTenantList(rows)
      }
    })

    adGroupApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setAdGroupList(rows)
      }
    })
  }, [])

  useEffect(() => {
    const list = [
      {
        id: 'tenant',
        label: 'Tenant',
        type: 'select',
        value: tenantId,
        itemList: tenantList,
        labelField: 'name',
        valueField: 'id',
        error: tenantError,
        helperText: tenantHelperText,
      },
      {
        id: 'group',
        label: 'AD Group',
        type: 'select',
        value: groupId,
        itemList: adGroupList,
        labelField: 'name',
        valueField: 'id',
        error: groupError,
        helperText: groupHelperText,
      },
    ]
    setFormFieldList(list)
  }, [
    tenantId,
    groupId,
    tenantList,
    adGroupList,
    tenantError,
    groupError,
    tenantHelperText,
    groupHelperText
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'tenant':
        setTenantId(value)
        break
      case 'group':
        setGroupId(value)
        break
      default:
        break
    }
  }
  const tenantCheck = async () => {
    const emptyCheck = checkEmpty("tenant", tenantId)
    setTenantError(emptyCheck.error)
    setTenantHelperText(emptyCheck.msg)
    if (!emptyCheck.error && !groupError) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, { tenantId, groupId })
      setTenantError(error)
      setTenantHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const groupCheck = async () => {
    const emptyCheck = checkEmpty("AD Group", groupId)
    setGroupError(emptyCheck.error)
    setGroupHelperText(emptyCheck.msg)
    if (!emptyCheck.error && !tenantError) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, { tenantId, groupId })
      setGroupError(error)
      setGroupHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  // 字段 tenant 检查
  useEffect(() => {
    if (tenantInit) {
      tenantCheck()
    } else {
      setTenantInit(true)
    }
    // eslint-disable-next-line
  }, [tenantId])
  // 字段 group 检查

  useEffect(() => {
    if (groupInit) {
      groupCheck()
    } else {
      setGroupInit(true)
    }
    // eslint-disable-next-line
  }, [groupId])

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Create'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default TenantGroupMappingCreate
