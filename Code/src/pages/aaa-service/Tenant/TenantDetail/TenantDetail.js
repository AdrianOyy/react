import React, {useEffect, useState} from 'react'

import DetailPage from "../../../../components/DetailPage"
import tenantApi from "../../../../api/tenant"
import {useParams} from "react-router-dom"
import dayjs from "dayjs"

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Tenant', path: '/aaa-service/tenant' },
  { title: 'Detail' },
]


function TenantDetail(props) {
  const { id } = useParams()
  const [ name, setName ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }

  useEffect(() => {
    tenantApi.detail(id).then(({ data }) => {
      if (data && data.data) {
        const { name, createdAt, updatedAt } = data.data
        setName(name)
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
      }
    })
  }, [id])

  useEffect(() => {
    const list = [
      { id: 'name', label: 'Name', type: 'text', disabled: true, readOnly: true, value: name },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  },[name, createdAt, updatedAt])
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch(id) {
      case 'name':
        setName(value)
        break
      default:
        break
    }
  }
  return (
    <React.Fragment>
        <DetailPage
          breadcrumbsList = { breadcrumbsList }
          formTitle = 'Tenant Detail'
          onFormFieldChange = { onFormFieldChange }
          formFieldList = { formFieldList }
        />
    </React.Fragment>
  )
}

export default TenantDetail
