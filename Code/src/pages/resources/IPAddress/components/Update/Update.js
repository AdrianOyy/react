import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"

import DetailPage from "../../../../../components/DetailPage"
import CommonTip from "../../../../../components/CommonTip"
import API from "../../../../../api/IPAssignment"
import DCAPI from "../../../../../api/dc"
import { checkEmpty, getCheckExist } from "../../untils/IPAssignmentCheck"

const listPath = '/resources/IPAddress'
const formTitle = 'Update'

function Update(props) {
  const { onMount } = props
  const { id } = useParams()
  const history = useHistory()
  const [ ip, setIP ] = useState('')
  const [ dc, setDC ] = useState('')
  const [ hostname, setHostname ] = useState('')
  const [ projectTeam, setProjectTeam ] = useState('')
  const [ networkType, setNetworkType ] = useState('')
  const [ ipPool, setIpPool ] = useState('')
  const [ vlanId, setVlanId ] = useState('')
  const [ remark, setRemark ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ ipError, setIpError ] = useState(false)
  const [ ipHelperText, setIpHelperText ] = useState('')
  const [ dcError, setDcError ] = useState(false)
  const [ dcHelperText, setDcHelperText ] = useState('')
  const [ dcList, setDcList ] = useState([])

  useEffect(() => {
    onMount('update')
    // eslint-disable-next-line
  }, [])

  const handleClick = async () => {
    const ipErr = await ipCheck()
    const dcErr = await dcCheck()
    if (ipErr || dcErr || saving) return
    setSaving(true)
    API.update(id, { ip, dc, hostname, projectTeam, networkType, ipPool, vlanId, remark  })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: listPath })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  // 获取 DC list
  useEffect(() => {
    DCAPI.list()
      .then(({ data }) => {
        setDcList(data.data)
      })
  }, [])

  useEffect(() => {
    API.detail({ id })
      .then(({ data }) => {
        const { IP, DC, hostname, projectTeam, networkType, IPPool, vlanId, remark } = data.data
        setIP(IP ? IP : '')
        setDC(DC ? DC.id : '')
        setHostname(hostname ? hostname : '')
        setProjectTeam(projectTeam ? projectTeam : '')
        setNetworkType(networkType ? networkType : '')
        setIpPool(IPPool ? IPPool : '')
        setVlanId(vlanId ? vlanId : '')
        setRemark(remark ? remark : '')
        setSaving(false)
      })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'ip', label: 'IP', type: 'text', required: true, readOnly: false, value: ip, error: ipError, helperText: ipHelperText },
      {
        id: 'dc', label: 'DC', type: 'select', required: false, labelWidth: 30,
        readOnly: false, value: dc, itemList: dcList, valueField: 'id',
        labelField: 'name', error: dcError, helperText: dcHelperText
      },
      { id: 'hostname', label: 'Hostname', type: 'text', required: false, readOnly: false, value: hostname },
      { id: 'projectTeam', label: 'Project Team', type: 'text', required: false, readOnly: false, value: projectTeam },
      { id: 'networkType', label: 'Network Type', type: 'text', required: false, readOnly: false, value: networkType },
      { id: 'ipPool', label: 'Ip Pool', type: 'text', required: false, readOnly: false, value: ipPool },
      { id: 'vlanId', label: 'Vlan ID', type: 'text', required: false, readOnly: false, value: vlanId },
      { id: 'remark', label: 'Remark', type: 'text', required: false, readOnly: false, value: remark },
    ]
    setFormFieldList(list)
  }, [
    ip, dc, hostname, projectTeam, networkType,
    ipPool, vlanId, remark, ipError, dcError,
    ipHelperText, dcHelperText, dcList
  ])

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

  const ipCheck = async () => {
    const emptyCheck = checkEmpty("IP", ip)
    setIpError(emptyCheck.error)
    setIpHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(id, ip)
      setIpError(error)
      setIpHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const dcCheck = async () => {
    const emptyCheck = checkEmpty("IP", ip)
    setDcError(emptyCheck.error)
    setDcHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const onFormFieldBlur = (_, id) => {
    switch (id) {
      case "ip":
        ipCheck()
        break
      case "dc":
        dcCheck()
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
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Update
