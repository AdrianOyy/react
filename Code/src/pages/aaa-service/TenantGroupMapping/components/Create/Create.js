import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenantGroupMapping"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/TenantGroupMappingFieldCheck"
import tenantApi from "../../../../../api/tenant"
import adGroupApi from "../../../../../api/adGroup"
import { L } from '../../../../../utils/lang'


function Create() {
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
  const [ errors, setErrors ] = useState({})

  const handleClick = async () => {
    const tenantError = await tenantCheck()
    const adGroupError = await groupCheck()
    if (tenantError || adGroupError || saving) return
    setSaving(true)
    API.create({ tenantId, groupId })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/aaa-service/tenantAdGroupMapping' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  // 获取 tenantList
  useEffect(() => {
    tenantApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setTenantList(rows)
      }
    })
  }, [])

  // 获取 groupList
  useEffect(() => {
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
        label: L('Tenant'),
        type: 'select',
        required: true,
        value: tenantId,
        itemList: tenantList,
        labelField: 'name',
        valueField: 'id',
        error: tenantError,
        helperText: tenantHelperText,
      },
      {
        id: 'group',
        label: L('AD Group'),
        type: 'select',
        required: true,
        value: groupId,
        itemList: adGroupList,
        labelField: 'name',
        valueField: 'id',
        error: groupError,
        helperText: groupHelperText,
      },
    ]
    setFormFieldList(list)
    // eslint-disable-next-line
  }, [ tenantList, adGroupList ])

  useEffect(() => {
    const errors = {
      tenant: {
        error: tenantError,
        helperText: tenantHelperText,
      },
      group: {
        error: groupError,
        helperText: groupHelperText,
      },
    }
    setErrors(errors)
    // eslint-disable-next-line
  }, [ tenantHelperText, groupHelperText ])

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

  return (
    <React.Fragment>
      <DetailPage
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
        errorFieldList = {errors}
        showBtn ={true}
        onBtnClick = {handleClick}
        showRequiredField={true}
      />
    </React.Fragment>
  )
}

export default Create
