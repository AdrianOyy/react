import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/platform"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"

function Detail(props) {
  const { onMount } = props

  const { id } = useParams()
  const [ name, setName ] = React.useState('')
  const [ typeId, setTypeId ] = useState('')
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
    API.detail(id).then(({ data }) => {
      if (data && data.data) {
        const { name, createdAt, updatedAt } = data.data
        setName(name)
        setTypeId(data.data["vm_platform_type.name"])
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
      }
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      {
        id: 'name', label: 'Name', type: 'text',
        disabled: true, readOnly: true, value: name
      },
      {
        id: 'typeId', label: 'Type', type: 'text',
        disabled: true, readOnly: true, value: typeId,
      },
      {
        id: 'createdAt', label: 'Created At', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(createdAt)
      },
      {
        id: 'updatedAt', label: 'Updated At', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(updatedAt)
      },
    ]
    setFormFieldList(list)
  }, [
    name, typeId, createdAt, updatedAt
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'name':
        setName(value)
        break
      case 'typeId':
        setTypeId(value)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Platform Detail'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default Detail
