import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/expiry"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"
import { L } from '../../../../../utils/lang'


function AssignDetail() {
  const { id } = useParams()
  const [ formFieldList, setFormFieldList ] = useState([])

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      if (data && data.data) {
        const defaultValue = data.data
        const assign = defaultValue.assign
        const tenant_group_mapping = assign && assign.tenant_group_mapping ? assign.tenant_group_mapping : ''
        const tenant = tenant_group_mapping && tenant_group_mapping.tenant && tenant_group_mapping.tenant.name ? tenant_group_mapping.tenant.name : ''
        const adGroup = tenant_group_mapping && tenant_group_mapping.ad_group && tenant_group_mapping.ad_group.name ? tenant_group_mapping.ad_group.name : ''
        const role = assign && assign.role && assign.role.label ? assign.role.label : ''
        const user = defaultValue.user && defaultValue.user.displayname ? defaultValue.user.displayname : ''

        const list = [
          { id: 'tenant', label: L('Tenant'), type: 'text', disabled: true, readOnly: true, value: tenant },
          { id: 'adGroup', label: L('AD Group'), type: 'text', disabled: true, readOnly: true, value: adGroup },
          { id: 'role', label: L('Role'), type: 'text', disabled: true, readOnly: true, value: role },
          { id: 'user', label: L('User'), type: 'text', disabled: true, readOnly: true, value: user },
          { id: 'expiryDate', label: L('Expiry Date'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(defaultValue.expiryDate) },
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

export default AssignDetail
