import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/role"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"

import { L } from '../../../../../utils/lang'


function Detail() {
  const { id } = useParams()
  const [ formFieldList, setFormFieldList ] = useState([])

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      if (data && data.data) {
        const defaultValue = data.data
        const list = [
          { id: 'label', label: L('Tenant\'s Group'), type: 'text', disabled: true, readOnly: true, value: defaultValue.label },
          { id: 'value', label: L('Right'), type: 'text', disabled: true, readOnly: true, value: defaultValue.value },
          { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(defaultValue.createdAt) },
          { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(defaultValue.updatedAt) },
        ]
        setFormFieldList(list)
      }
    })
  }, [ id ])

  return (
    <React.Fragment>
      <DetailPage
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default Detail
