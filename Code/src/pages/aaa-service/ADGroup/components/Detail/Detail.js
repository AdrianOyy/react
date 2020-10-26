import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/adGroup"
import { L } from '../../../../../utils/lang'

const formTitle = 'Detail'

function Detail(props) {
  const { onMount } = props
  const { id } = useParams()
  const [ name, setName ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdatedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])

  useEffect(() => {
    onMount('detail')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      const { name, createdAt, updatedAt } = data.data
      setName(name)
      setCreatedAt(createdAt)
      setUpdatedAt(updatedAt)
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'name', label: L('Name'), type: 'text', disabled: true, readOnly: true, value: name },
      { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ name, createdAt, updatedAt ])
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
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
        formTitle = {formTitle}
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default Detail
