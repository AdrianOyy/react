import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/IPAssignment"
import { useParams } from "react-router-dom"

function Detail(props) {
  const { onMount } = props

  const { id } = useParams()
  const [ ip, setIP ] = useState('')
  const [ dc, setDC ] = useState('')
  const [ hostname, setHostname ] = useState('')
  const [ projectTeam, setProjectTeam ] = useState('')
  const [ networkType, setNetworkType ] = useState('')
  const [ ipPool, setIpPool ] = useState('')
  const [ vlanId, setVlanId ] = useState('')
  const [ remark, setRemark ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
 

  useEffect(() => {
    onMount('detail')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      const { ip, dc, hostname, projectTeam, networkType, ipPool, vlanId, remark } = data.data
      setIP(ip)
      setDC(dc)
      setHostname(hostname)
      setProjectTeam(projectTeam)
      setNetworkType(networkType)
      setIpPool(ipPool)
      setVlanId(vlanId)
      setRemark(remark)
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'ip', label: 'IP', type: 'text', required: false, readOnly: true },
      { id: 'dc', label: 'DC', type: 'text', required: false, readOnly: true },
      { id: 'hostname', label: 'Hostname', type: 'text', required: false, readOnly: true },
      { id: 'projectTeam', label: 'Project Team', type: 'text', required: false, readOnly: true },
      { id: 'networkType', label: 'Network Type', type: 'text', required: false, readOnly: true },
      { id: 'ipPool', label: 'Ip Pool', type: 'text', required: false, readOnly: true },
      { id: 'vlanId', label: 'Vlan ID', type: 'text', required: false, readOnly: true },
      { id: 'remark', label: 'Remark', type: 'text', required: false, readOnly: true },
    ]
    setFormFieldList(list)
  }, [ ip, dc, hostname, projectTeam, networkType, ipPool, vlanId, remark])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'ip':
        setIP(value)
        break
      case 'dc':
        setDC(value)
        break
      case 'hostname':
        setHostname(value)
        break
      case 'projectTeam':
        setProjectTeam(value)
        break
      case 'networkType':
        setNetworkType(value)
        break
      case 'ipPool':
        setIpPool(value)
        break
      case 'vlanId':
        setVlanId(value)
        break
      case 'remark':
        setRemark(value)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'IP Assignment Detail'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default Detail
