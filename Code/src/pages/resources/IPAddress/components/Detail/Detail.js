import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/IPAssignment"
import { useParams } from "react-router-dom"
import { L } from '../../../../../utils/lang'

function Detail() {

  const { id } = useParams()
  const [ ip, setIP ] = useState('')
  const [ dc, setDC ] = useState('')
  const [ hostname, setHostname ] = useState('')
  const [ projectTeam, setProjectTeam ] = useState('')
  const [ networkType, setNetworkType ] = useState('')
  const [ ipPool, setIpPool ] = useState('')
  const [ vlanId, setVlanId ] = useState('')
  const [ remark, setRemark ] = useState('')
  const [ assignedDate, setAssignedDate ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])

  useEffect(() => {
    API.detail({ id })
      .then(({ data }) => {
        const { IP, DC, hostname, projectTeam, networkType, IPPool, assignedDate, vlanId, remark } = data.data
        setIP(IP ? IP : '')
        setDC(DC ? DC.name : '')
        setHostname(hostname ? hostname : '')
        setProjectTeam(projectTeam ? projectTeam : '')
        setNetworkType(networkType ? networkType : '')
        setIpPool(IPPool ? IPPool : '')
        setVlanId(vlanId ? vlanId : '')
        setRemark(remark ? remark : '')
        setAssignedDate(assignedDate ? assignedDate : '')
      })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'ip', label: L('IP'), type: 'text', required: false, readOnly: true, value: ip },
      { id: 'dc', label: L('DC'), type: 'text', required: false, readOnly: true, value: dc },
      { id: 'hostname', label: L('Hostname'), type: 'text', required: false, readOnly: true, value: hostname },
      { id: 'projectTeam', label: L('Project Team'), type: 'text', required: false, readOnly: true, value: projectTeam },
      { id: 'networkType', label: L('Network Type'), type: 'text', required: false, readOnly: true, value: networkType },
      { id: 'ipPool', label: L('IP Pool'), type: 'text', required: false, readOnly: true, value: ipPool },
      { id: 'vlanId', label: L('VLan ID'), type: 'text', required: false, readOnly: true, value: vlanId },
      { id: 'remark', label: L('Remark'), type: 'text', required: false, readOnly: true, value: remark },
      { id: 'assignedDate', label: L('Assigned Date'), type: 'date', required: false, readOnly: true, value: assignedDate },
    ]
    setFormFieldList(list)
  }, [ ip, dc, hostname, projectTeam, networkType, ipPool, vlanId, remark, assignedDate ])

  return (
    <React.Fragment>
      <DetailPage
        formTitle={L('Detail')}
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default Detail
