import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/expiry"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"

const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('DD-MMM-YYYY HH:mm')
}

function AssignDetail(props) {
  const { onMount } = props
  const { id } = useParams()
  const [ tenant, setTenant ] = useState('')
  const [ adGroup, setAdGroup ] = useState('')
  const [ role, setRole ] = useState('')
  const [ user, setUser ] = useState('')
  const [ expiryDate, setExpiryDate ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])

  // 用于更新面包屑
  useEffect(() => {
    onMount('Detail')
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    API.detail(id).then(({ data }) => {
      if (data && data.data) {
        const { user, assign, expiryDate, createdAt, updatedAt } = data.data
        const { tenant_group_mapping, role } = assign
        const { ad_group, tenant } = tenant_group_mapping
        if (tenant && tenant.name) {
          setTenant(tenant.name)
        }
        if (ad_group && ad_group.name) {
          setAdGroup(ad_group.name)
        }
        if (role && role.label) {
          setRole(role.label)
        }
        if (user && user.displayname) {
          setUser(user.displayname)
        }
        setExpiryDate(expiryDate)
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
      }
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'tenant', label: 'Tenant', type: 'text', disabled: true, readOnly: true, value: tenant },
      { id: 'adGroup', label: 'AD Group', type: 'text', disabled: true, readOnly: true, value: adGroup },
      { id: 'role', label: 'Role', type: 'text', disabled: true, readOnly: true, value: role },
      { id: 'user', label: 'User', type: 'text', disabled: true, readOnly: true, value: user },
      { id: 'expiryDate', label: 'Expiry Date', type: 'text', disabled: true, readOnly: true, value: formatDateTime(expiryDate) },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ tenant, adGroup, role, user, expiryDate, createdAt, updatedAt ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'tenant':
        setTenant(value)
        break
      case 'adGroup':
        setAdGroup(value)
        break
      case 'role':
        setRole(value)
        break
      case 'user':
        setUser(value)
        break
      case 'expiryDate':
        setExpiryDate(value)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Detail'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default AssignDetail
