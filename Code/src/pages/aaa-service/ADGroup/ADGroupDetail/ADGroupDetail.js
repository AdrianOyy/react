import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import dayjs from "dayjs"

import DetailPage from "../../../../components/DetailPage"
import ADGroupApi from "../../../../api/adGroup"

const listPath = '/aaa-service/adgroup'
const formTitle = 'AD Group Detail'
const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'AD Group', path: listPath },
  { title: 'Detail' },
]

function Detail() {
  const { id } = useParams()
  const [ name, setName ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }

  useEffect(() => {
    ADGroupApi.detail(id).then(({ data }) => {
      const { name, createdAt, updatedAt } = data.data
      setName(name)
      setCreatedAt(createdAt)
      setUpdastedAt(updatedAt)
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
          breadcrumbsList = {breadcrumbsList}
          formTitle = {formTitle}
          onFormFieldChange = {onFormFieldChange}
          formFieldList = {formFieldList}
        />
    </React.Fragment>
  )
}

export default Detail
