import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import DetailPage from "../../../../../components/DetailPage"
import CommonTip from "../../../../../components/CommonTip"
import API from "../../../../../api/IPAssignment"
import { checkEmpty } from "../../untils/IPAssignmentCheck"

const listPath = '/workflow/IPAssignment'
const formTitle = 'IP Assignment Create'

function Create(props) {
  const { onMount } = props
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
  const [ saving, setSaving ] = useState(false)
  const [ nameError, setNameError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")

  useEffect(() => {
    onMount('create')
    // eslint-disable-next-line
  }, [])

  const handelClick = async () => {
    const nameErr = await nameCheck()
    if (nameErr || saving) return
    setSaving(true)
    API.create({ ip, dc, hostname, projectTeam,networkType, ipPool, vlanId, remark })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: listPath })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    const list = [
      { id: 'ip', label: 'IP', type: 'text', required: true, readOnly: false, value: ip, error: nameError, helperText: nameHelperText },
      { id: 'dc', label: 'DC', type: 'text', required: false, readOnly: false, value: dc },
      { id: 'hostname', label: 'Hostname', type: 'text', required: false, readOnly: false, value: hostname },
      { id: 'projectTeam', label: 'Project Team', type: 'text', required: false, readOnly: false, value: projectTeam },
      { id: 'networkType', label: 'Network Type', type: 'text', required: false, readOnly: false, value: networkType },
      { id: 'ipPool', label: 'Ip Pool', type: 'text', required: false, readOnly: false, value: ipPool },
      { id: 'vlanId', label: 'Vlan ID', type: 'text', required: false, readOnly: false, value: vlanId },
      { id: 'remark', label: 'Remark', type: 'text', required: false, readOnly: false, value: remark },
    ]
    setFormFieldList(list)
  }, [ ip, dc, hostname, projectTeam, networkType, ipPool, vlanId, remark, nameError, nameHelperText ])
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
  const nameCheck = async () => {
    const emptyCheck = checkEmpty("IP", ip)
    setNameError(emptyCheck.error)
    setNameHelperText(emptyCheck.msg)
    // if (!emptyCheck.error) {
    //   const checkExist = getCheckExist()
    //   const { error, msg } = await checkExist(0, name)
    //   setNameError(error)
    //   setNameHelperText(msg)
    //   return error
    // }
    return emptyCheck.error
  }
  const onFormFieldBlur = (_, id) => {
    switch (id) {
      case "ip":
        nameCheck()
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
        onBtnClick = {handelClick}
      />
    </React.Fragment>
  )
}

export default Create