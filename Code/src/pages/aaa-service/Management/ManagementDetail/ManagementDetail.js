import React, {useEffect, useState} from 'react'

import DetailPage from "../../../../components/DetailPage"
import managementApi from "../../../../api/management"
import {useParams} from "react-router-dom"
import dayjs from "dayjs"

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Tenant AD Group Mapping', path: '/aaa-service/management' },
  { title: 'Detail' },
]


function ManagementDetail(props) {
  const { id } = useParams()
  const [tenant, setTenant] = React.useState('')
  const [adGroup, setAdGroup] = React.useState('')
  const [supporter, setSupporter] = useState('')
  const [resourcesQuota, setResourcesQuota] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }

  useEffect(() => {
    managementApi.detail(id).then(({ data }) => {
      if (data && data.data) {
        const { tenant, ad_group, supporter, resourcesQuota, createdAt, updatedAt } = data.data
        setTenant(tenant.name)
        setAdGroup(ad_group.name)
        setSupporter(supporter)
        setResourcesQuota(resourcesQuota)
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
      }
    })
  }, [id])

  useEffect(() => {
    const list = [
      { id: 'tenant', label: 'Tenant', type: 'text', disabled: true, readOnly: true, value: tenant },
      { id: 'adGroup', label: 'AD Group', type: 'text', disabled: true, readOnly: true, value: adGroup },
      { id: 'supporter', label: 'Supporter', type: 'text', disabled: true, readOnly: true, value: supporter },
      { id: 'resourcesQuota', label: 'Resources Quota', type: 'text', disabled: true, readOnly: true, value: resourcesQuota },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  },[tenant, adGroup, supporter, resourcesQuota, createdAt, updatedAt])
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch(id) {
      case 'tenant':
        setTenant(value)
        break
      case 'adGroup':
        setAdGroup(value)
        break
      case 'supporter':
        setSupporter(value)
        break
      case 'resourcesQuota':
        setResourcesQuota(value)
        break
      default:
        break
    }
  }
  return (
    <React.Fragment>
      <DetailPage
        breadcrumbsList = { breadcrumbsList }
        formTitle = 'Management Detail'
        onFormFieldChange = { onFormFieldChange }
        formFieldList = { formFieldList }
      />
    </React.Fragment>
  )
}

export default ManagementDetail
