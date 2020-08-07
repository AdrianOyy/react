import React, {useEffect, useState} from 'react'

import DetailPage from "../../../../components/DetailPage"
import assignAPi from "../../../../api/assign"
import {useParams} from "react-router-dom"
import dayjs from "dayjs"

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Assign', path: '/aaa-service/assign' },
  { title: 'Detail' },
]


function AssignDetail(props) {
  const { id } = useParams()
  const [tenant, setTenant] = useState('')
  const [adGroup, setAdGroup] = useState('')
  const [role, setRole] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }

  useEffect(() => {
    assignAPi.detail(id).then(({ data }) => {
      if (data && data.data) {
        console.log("data: ", data.data)
        const { role, tenant_group_mapping, createdAt, updatedAt } = data.data
        const { ad_group, tenant } = tenant_group_mapping
        setTenant(tenant.name)
        setAdGroup(ad_group.name)
        setRole(role.label)
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
      }
    })
  }, [id])

  useEffect(() => {
    const list = [
      { id: 'tenant', label: 'Tenant', type: 'text', disabled: true, readOnly: true, value: tenant },
      { id: 'adGroup', label: 'AD Group', type: 'text', disabled: true, readOnly: true, value: adGroup },
      { id: 'role', label: 'Role', type: 'text', disabled: true, readOnly: true, value: role },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  },[tenant, adGroup, role, createdAt, updatedAt])
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch(id) {
      case 'tenant':
        setTenant(value)
        break
      case 'adGroup':
        setAdGroup(value)
        break
      case 'role':
        setRole(value)
        break
      default:
        break
    }
  }
  return (
    <React.Fragment>
      <DetailPage
        breadcrumbsList = { breadcrumbsList }
        formTitle = 'Tenant AD Group Mapping Detail'
        onFormFieldChange = { onFormFieldChange }
        formFieldList = { formFieldList }
      />
    </React.Fragment>
  )
}

export default AssignDetail
