import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/role"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"

import { L } from '../../../../../utils/lang'
function Detail(props) {
  const { onMount } = props

  const { id } = useParams()
  const [ label, setLabel ] = React.useState('')
  const [ value, setValue ] = React.useState('')
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
        const { label, value, createdAt, updatedAt } = data.data
        setLabel(label)
        setValue(value)
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
      }
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'label', label: L('Label'), type: 'text', disabled: true, readOnly: true, value: label },
      { id: 'value', label: L('Value'), type: 'text', disabled: true, readOnly: true, value },
      { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ label, value, createdAt, updatedAt ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'label':
        setLabel(value)
        break
      case 'value':
        setValue(value)
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
