import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/expiry"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty } from "../../untils/expiryFieldCheck"

const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
}

function AssignUpdate(props) {
  const { onMount } = props
  const { id } = useParams()
  const history = useHistory()
  const [ tenant, setTenant ] = useState('')
  const [ group, setGroup ] = useState('')
  const [ role, setRole ] = useState('')
  const [ user, setUser ] = useState('')
  const [ expiryDate, setExpiryDate ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ expiryDateError, setExpiryDateError ] = useState(false)
  const [ expiryDateHelperText, setExpiryDateHelperText ] = useState("")
  const [ expiryDateInit, setExpiryDateInit ] = useState(false)

  // 用于更新面包屑
  useEffect(() => {
    onMount('update')
    // eslint-disable-next-line
  }, [])

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
        CommonTip.success("Success")
        history.push({ pathname: '/aaa-service/assign' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.detail(id)
      .then(({ data }) => {
        if (data && data.data) {
          const { user, assign, expiryDate, createdAt, updatedAt } = data.data
          const { tenant_group_mapping, role } = assign
          const { ad_group, tenant } = tenant_group_mapping
          if (tenant && tenant.name) {
            setTenant(tenant.name)
          }
          if (ad_group && ad_group.name) {
            setGroup(ad_group.name)
          }
          if (role && role.label) {
            setRole(role.label)
          }
          if (user && user.displayname) {
            setUser(user.displayname)
          }
          setExpiryDate(dayjs(new Date(expiryDate)).format('YYYY-MM-DD'))
          setCreatedAt(createdAt)
          setUpdastedAt(updatedAt)
        }
      })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'tenant', label: 'Tenant', type: 'text', disabled: true, readOnly: true, value: tenant },
      { id: 'adGroup', label: 'AD Group', type: 'text', disabled: true, readOnly: true, value: group },
      { id: 'role', label: 'Role', type: 'text', disabled: true, readOnly: true, value: role },
      { id: 'user', label: 'User', type: 'text', disabled: true, readOnly: true, value: user },
      { id: 'expiryDate', label: 'Expiry Date', type: 'date', disabled: false, readOnly: false,
        required: true, value: expiryDate, error: expiryDateError, helperText: expiryDateHelperText },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ tenant, group, role, user, expiryDate, expiryDateError, expiryDateHelperText, createdAt, updatedAt ])

  // 字段改变
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'expiryDate':
        setExpiryDate(dayjs(new Date(value)).format('YYYY-MM-DD'))
        break
      default:
        break
    }
  }

  // 字段 expiryDate 检查
  useEffect(() => {
    if (expiryDateInit) {
      expiryDateCheck()
    } else {
      setExpiryDateInit(true)
    }
    // eslint-disable-next-line
  }, [expiryDate])

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Expiry Update'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default AssignUpdate
