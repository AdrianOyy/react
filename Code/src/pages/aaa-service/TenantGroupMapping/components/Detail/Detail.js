import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import tenantGroupMappingApi from "../../../../../api/tenantGroupMapping"
import { useParams } from "react-router-dom"
import { L } from '../../../../../utils/lang'
import formatDateTime from "../../../../../utils/formatDateTime"


function Detail() {
  const { id } = useParams()
  const [ formFieldList, setFormFieldList ] = useState([])

  useEffect(() => {
    tenantGroupMappingApi.detail(id)
      .then(({ data }) => {
        if (data && data.data) {
          const defaultValue = data.data
          const tenant = defaultValue.tenant && defaultValue.tenant.name ? defaultValue.tenant.name : ''
          const adGroup = defaultValue.tenant && defaultValue.ad_group.name ? defaultValue.ad_group.name : ''

          const list = [
            { id: 'tenant', label: L('Tenant'), type: 'text', disabled: true, readOnly: true, value: tenant },
            { id: 'adGroup', label: L('AD Group'), type: 'text', disabled: true, readOnly: true, value: adGroup },
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
