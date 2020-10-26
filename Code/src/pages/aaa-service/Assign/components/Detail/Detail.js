import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/assign"
import { L } from '../../../../../utils/lang'
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"


function Detail(props) {
  const { onMount } = props
  const { id } = useParams()
  const [ tenant, setTenant ] = useState('')
  const [ adGroup, setAdGroup ] = useState('')
  const [ role, setRole ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])


  useEffect(() => {
    onMount('detail')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      if (data && data.data) {
        console.log("data: ", data.data)
        const { role, tenant_group_mapping, createdAt, updatedAt } = data.data
        const { ad_group, tenant } = tenant_group_mapping
        if (tenant && tenant.name) {
          setTenant(tenant.name)
        }
        if (ad_group && ad_group.name) {
          setAdGroup(ad_group.name)
        }
        setRole(role.label)
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
      }
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'tenant', label: L('Tenant'), type: 'text', disabled: true, readOnly: true, value: tenant },
      { id: 'adGroup', label: L('AD Group'), type: 'text', disabled: true, readOnly: true, value: adGroup },
      { id: 'role', label: L('Role'), type: 'text', disabled: true, readOnly: true, value: role },
      { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ tenant, adGroup, role, createdAt, updatedAt ])

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
      default:
        break
    }
  }
  return (
    <React.Fragment>
      <DetailPage
        formTitle={L('Detail')}
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default Detail
