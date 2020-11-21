import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/IPAssignment"
import { useParams } from "react-router-dom"
import { L } from '../../../../../utils/lang'

function Detail() {

  const { id } = useParams()
  const [ formFieldList, setFormFieldList ] = useState([])

  useEffect(() => {
    API.detail({ id })
      .then(({ data }) => {
        const defaultValue = data.data

        const list = [
          { id: 'ip', label: L('IP'), type: 'text', required: true, disabled: true, readOnly: true, value: defaultValue.IP },
          { id: 'dc', label: L('DC'), type: 'text', required: true, disabled: true, readOnly: true, value: defaultValue.DC ? defaultValue.DC.name : '' },
          { id: 'hostname', label: L('Hostname'), type: 'text', required: false, disabled: true, readOnly: true, value: defaultValue.hostname },
          { id: 'projectTeam', label: L('Project Team'), type: 'text', required: false, disabled: true, readOnly: true, value: defaultValue.projectTeam },
          { id: 'networkType', label: L('Network Type'), type: 'text', required: false, disabled: true, readOnly: true, value: defaultValue.networkType },
          { id: 'ipPool', label: L('IP Pool'), type: 'text', required: false, disabled: true, readOnly: true, value: defaultValue.IPPool },
          { id: 'vlanId', label: L('VLan ID'), type: 'text', required: false, disabled: true, readOnly: true, value: defaultValue.vlanId },
          { id: 'remark', label: L('Remark'), type: 'text', required: false, disabled: true, readOnly: true, value: defaultValue.remark },
          { id: 'assignedDate', label: L('Assigned Date'), type: 'date', required: false, disabled: true, readOnly: true, value: defaultValue.assignedDate },
        ]
        setFormFieldList(list)
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
