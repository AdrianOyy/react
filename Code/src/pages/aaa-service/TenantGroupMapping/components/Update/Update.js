import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenantGroupMapping"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/TenantGroupMappingFieldCheck"
import tenantApi from "../../../../../api/tenant"
import adGroupApi from "../../../../../api/adGroup"
import { L } from '../../../../../utils/lang'


function Update() {
  const { id } = useParams()
  const history = useHistory()
  const [ tenantId, setTenantId ] = React.useState('')
  const [ groupId, setGroupId ] = React.useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ tenantError, setTenantError ] = useState(false)
  const [ groupError, setGroupError ] = useState(false)
  const [ tenantHelperText, setTenantHelperText ] = useState("")
  const [ groupHelperText, setGroupHelperText ] = useState("")
  const [ errors, setErrors ] = useState({})

  const tenantCheck = async () => {
    const emptyCheck = checkEmpty("Tenant", tenantId)
    setTenantError(emptyCheck.error)
    setTenantHelperText(emptyCheck.msg)
    if (!emptyCheck.error && !groupError) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(id, { tenantId, groupId })
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
      const { error, msg } = await checkExist(id, { tenantId, groupId })
      setGroupError(error)
      setGroupHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const handleClick = async () => {
    const tenantError = await tenantCheck()
    const adGroupError = await groupCheck()
    if (tenantError || adGroupError || saving) return
    setSaving(true)
    API.update(id, { tenantId, groupId })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/aaa-service/tenantAdGroupMapping' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    tenantApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        return data.data.rows
      } else {
        return []
      }
    }).then(returnObj => {
      adGroupApi.list({ limit: 999, page: 1 }).then(({ data }) => {
        if (data && data.data) {
          return {
            tenantList: returnObj,
            adGroupList: data.data.rows,
          }
        } else {
          return {
            tenantList: returnObj,
            adGroupList: [],
          }
        }
      }).then(returnObj => {
        API.detail(id).then(({ data }) => {
          const { tenant, ad_group } = data.data
          setTenantId(tenant.id)
          setGroupId(ad_group.id)
          setSaving(false)

          const defaultValue = data.data
          const list = [
            {
              id: 'tenant', label: L('Tenant'), type: 'select', required: true,
              readOnly: false, value: defaultValue.tenantId, error: tenantError, helperText: tenantHelperText,
              itemList: returnObj.tenantList, labelField: "name", valueField: "id"
            },
            {
              id: 'group', label: L('AD Group'), type: 'select', required: true,
              readOnly: false, value: defaultValue.ad_groupId, error: groupError, helperText: groupHelperText,
              itemList: returnObj.adGroupList, labelField: "name", valueField: "id"
            },
            { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(defaultValue.createdAt) },
            { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(defaultValue.updatedAt) },
          ]
          setFormFieldList(list)
        })
      })
    })
    // eslint-disable-next-line
  }, [ id ])

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
  }, [
    tenantHelperText,
    groupHelperText,
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

export default Update
