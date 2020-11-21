import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"

import DetailPage from "../../../../../components/DetailPage"
import CommonTip from "../../../../../components/CommonTip"
import API from "../../../../../api/IPAssignment"
import DCAPI from "../../../../../api/dc"
import { L } from '../../../../../utils/lang'
import { checkEmpty, getCheckExist } from "../../untils/IPAssignmentCheck"

const listPath = '/resources/IPAddress'

function Update() {
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
  const [ errors, setErrors ] = useState({})

  const handleClick = async () => {
    const ipErr = await ipCheck()
    const dcErr = await dcCheck()
    if (ipErr || dcErr || saving) return
    setSaving(true)
    API.update(id, { ip, dc, hostname, projectTeam, networkType, ipPool, vlanId, remark })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: listPath })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    DCAPI.list().then(({ data }) => {
      if (data && data.data) {
        return data.data
      } else {
        return []
      }
    }).then(returnObj => {
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

          const defaultValue = data.data
          const list = [
            { id: 'ip', label: L('IP'), type: 'text', required: true, readOnly: false, value: defaultValue.IP, error: ipError, helperText: ipHelperText },
            {
              id: 'dc', label: L('DC'), type: 'select', required: false, labelWidth: 30,
              readOnly: false, value: defaultValue.DC ? defaultValue.DC.id : '', itemList: returnObj, valueField: 'id',
              labelField: 'name', error: dcError, helperText: dcHelperText
            },
            { id: 'hostname', label: L('Hostname'), type: 'text', required: false, readOnly: false, value: defaultValue.hostname },
            { id: 'projectTeam', label: L('Project Team'), type: 'text', required: false, readOnly: false, value: defaultValue.projectTeam },
            { id: 'networkType', label: L('Network Type'), type: 'text', required: false, readOnly: false, value: defaultValue.networkType },
            { id: 'ipPool', label: L('Ip Pool'), type: 'text', required: false, readOnly: false, value: defaultValue.ipPool },
            { id: 'vlanId', label: L('Vlan ID'), type: 'text', required: false, readOnly: false, value: defaultValue.vlanId },
            { id: 'remark', label: L('Remark'), type: 'text', required: false, readOnly: false, value: defaultValue.remark },
          ]
          setFormFieldList(list)
        })
    })
    // eslint-disable-next-line
  }, [ id ])

  useEffect(() => {
    const errors = {
      ip: {
        error: ipError,
        helperText: ipHelperText,
      },
      dc: {
        error: dcError,
        helperText: dcHelperText,
      }
    }
    setErrors(errors)
    // eslint-disable-next-line
  }, [ ipHelperText, dcHelperText ])

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
    const emptyCheck = checkEmpty("dc", ip)
    setDcError(emptyCheck.error)
    setDcHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  return (
    <React.Fragment>
      <DetailPage
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
        errorFieldList = {errors}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Update
