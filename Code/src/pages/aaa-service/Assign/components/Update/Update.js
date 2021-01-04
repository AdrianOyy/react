import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import assignApi from "../../../../../api/assign"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty } from "../../untils/assignFieldCheck"
import roleApi from "../../../../../api/role"
import API from "../../../../../api/assign"
import { L } from '../../../../../utils/lang'


function Update() {
  const { id } = useParams()
  const history = useHistory()
  const [ roleId, setRoleId ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ roleError, setRoleError ] = useState(false)
  const [ roleHelperText, setRoleHelperText ] = useState("")
  const [ errors, setErrors ] = useState({})

  const roleCheck = async () => {
    const emptyCheck = checkEmpty("role", roleId, "Role")
    setRoleError(emptyCheck.error)
    setRoleHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const handleClick = async () => {
    const roleError = await roleCheck()
    if (roleError || saving) return
    setSaving(true)
    assignApi.update(id, { roleId })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/aaa-service/assign' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    roleApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        return data.data.rows
      } else {
        return []
      }
    }).then(returnObj => {
      API.detail(id).then(({ data }) => {
        if (data && data.data) {
          const { role, tenant_group_mapping } = data.data
          const { ad_group, tenant } = tenant_group_mapping
          let tenantId = ''
          if (tenant && tenant.name) {
            tenantId = tenant.name
          }
          let adGroup = ''
          if (ad_group && ad_group.name) {
            adGroup = ad_group.name
          }
          let roleValue = ''
          if (role && role.id) {
            roleValue = role.id
          }

          const defaultValue = data.data
          const list = [
            { id: 'tenant', label: L('Tenant'), type: 'text', disabled: true, readOnly: true, value: tenantId },
            { id: 'adGroup', label: L('AD Group'), type: 'text', disabled: true, readOnly: true, value: adGroup },
            {
              id: 'role', label: L('Role'), type: 'select', required: true,
              readOnly: false, value: roleValue, error: roleError, helperText: roleHelperText,
              itemList: returnObj, labelField: "label", valueField: "id"
            },
            { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(defaultValue.createdAt) },
            { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(defaultValue.updatedAt) },
          ]
          setFormFieldList(list)
        }
      })
    })
    // eslint-disable-next-line
  }, [ id ])

  useEffect(() => {
    const errors = {
      role: {
        error: roleError,
        helperText: roleHelperText,
      },
    }
    setErrors(errors)
    // eslint-disable-next-line
  }, [
    roleHelperText,
  ])

  // 字段改变
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'role':
        setRoleId(value)
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
