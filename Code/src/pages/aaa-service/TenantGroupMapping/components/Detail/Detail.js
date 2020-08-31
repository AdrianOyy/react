import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import tenantGroupMappingApi from "../../../../../api/tenantGroupMapping"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"


function Detail(props) {
  const { onMount } = props
  const { id } = useParams()
  const [ tenant, setTenant ] = React.useState('')
  const [ adGroup, setAdGroup ] = React.useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('DD-MMM-YYYY HH:mm')
  }

  useEffect(() => {
    onMount('detail')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    tenantGroupMappingApi.detail(id)
      .then(({ data }) => {
        if (data && data.data) {
          const { tenant, ad_group, createdAt, updatedAt } = data.data
          if (tenant && tenant.name) {
            setTenant(tenant.name)
          }
          if (ad_group && ad_group.name) {
            setAdGroup(ad_group.name)
          }
          setCreatedAt(createdAt)
          setUpdastedAt(updatedAt)
        }
      })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'tenant', label: 'Tenant', type: 'text', disabled: true, readOnly: true, value: tenant },
      { id: 'adGroup', label: 'AD Group', type: 'text', disabled: true, readOnly: true, value: adGroup },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ tenant, adGroup, createdAt, updatedAt ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'tenant':
        setTenant(value)
        break
      case 'adGroup':
        setAdGroup(value)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Tenant AD Group Mapping Detail'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default Detail
