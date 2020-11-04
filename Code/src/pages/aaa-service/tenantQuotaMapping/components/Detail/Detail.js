import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenantQuotaMapping"
import { useParams } from "react-router-dom"
import { L } from '../../../../../utils/lang'
import formatDateTime from "../../../../../utils/formatDateTime"


function Detail(props) {
  const { id } = useParams()
  const [ tenant, setTenant ] = React.useState('')
  const [ type, setType ] = React.useState('')
  const [ year, setYear ] = useState('')
  const [ quota, setQuota ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdatedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])


  useEffect(() => {
    API.detail(id)
      .then(({ data }) => {
        if (data && data.data) {
          const { tenant, type, year, quota, createdAt, updatedAt } = data.data
          if (tenant && tenant.name) {
            setTenant(tenant.name)
          }
          setType(type)
          setYear(year)
          setQuota(quota)
          setCreatedAt(createdAt)
          setUpdatedAt(updatedAt)
        }
      })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'tenant', label: L('Tenant'), type: 'text', disabled: true, readOnly: true, value: tenant },
      { id: 'type', label: L('Type'), type: 'text', disabled: true, readOnly: true, value: type },
      { id: 'quota', label: L('Quota'), type: 'text', disabled: true, readOnly: true, value: quota },
      { id: 'year', label: L('Year'), type: 'text', disabled: true, readOnly: true, value: year },
      { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ tenant, type, quota, year, createdAt, updatedAt ])

  return (
    <React.Fragment>
      <DetailPage
        formTitle={L('Detail')}
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default Detail
