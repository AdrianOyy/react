import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/expiry"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"
import CommonTip from "../../../../../components/CommonTip"
import { L } from '../../../../../utils/lang'
import { useHistory } from 'react-router-dom'
import { checkEmpty } from "../../untils/expiryFieldCheck"


function Update() {
  const { id } = useParams()
  const history = useHistory()
  const [ expiryDate, setExpiryDate ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ expiryDateError, setExpiryDateError ] = useState(false)
  const [ expiryDateHelperText, setExpiryDateHelperText ] = useState("")
  const [ errors, setErrors ] = useState({})

  const expiryDateCheck = async () => {
    const emptyCheck = checkEmpty("Expiry Date", expiryDate)
    setExpiryDateError(emptyCheck.error)
    setExpiryDateHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const handleClick = async () => {
    const roleError = await expiryDateCheck()
    if (roleError || saving) return
    setSaving(true)
    API.update(id, { expiryDate })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.detail(id)
      .then(({ data }) => {
        if (data && data.data) {
          const { user, assign } = data.data
          const { tenant_group_mapping, role } = assign
          const { ad_group, tenant } = tenant_group_mapping
          let tenantValue = ''
          if (tenant && tenant.name) {
            tenantValue = tenant.name
          }
          let adGroup = ''
          if (ad_group && ad_group.name) {
            adGroup = ad_group.name
          }
          let roleValue = ''
          if (role && role.label) {
            roleValue = role.label
          }
          let userValue = ''
          if (user && user.displayname) {
            userValue = user.displayname
          }

          const defaultValue = data.data
          const list = [
            { id: 'tenant', label: L('Tenant'), type: 'text', disabled: true, readOnly: true, value: tenantValue },
            { id: 'adGroup', label: L('AD Group'), type: 'text', disabled: true, readOnly: true, value: adGroup },
            { id: 'role', label: L('Role'), type: 'text', disabled: true, readOnly: true, value: roleValue },
            { id: 'user', label: L('User'), type: 'text', disabled: true, readOnly: true, value: userValue },
            {
              id: 'expiryDate', label: L('Expiry Date'), type: 'date', disabled: false, readOnly: false,
              required: true, value: formatDateTime(defaultValue.expiryDate), error: expiryDateError, helperText: expiryDateHelperText
            },
            { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(defaultValue.createdAt) },
            { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(defaultValue.updatedAt) },
          ]
          setFormFieldList(list)
        }
      })
      // eslint-disable-next-line
  }, [ id ])

  useEffect(() => {
    const errors = {
      expiryDate: {
        error: expiryDateError,
        helperText: expiryDateHelperText,
      },
    }
    setErrors(errors)
    // eslint-disable-next-line
  }, [ expiryDateHelperText ])

  // 字段改变
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'expiryDate':
        setExpiryDate(formatDateTime(value))
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
