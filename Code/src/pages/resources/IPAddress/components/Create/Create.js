import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/IPAssignment"
import CommonTip from "../../../../../components/CommonTip"
import { checkEmpty, getCheckExist } from "../../untils/IPAssignmentCheck"
import dcAPI from "../../../../../api/dc"
import { L } from '../../../../../utils/lang'
const listPath = '/resources/IPAddress'

function Create() {
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
  const [ ipError, setIpError ] = useState(false)
  const [ ipHelperText, setIpHelperText ] = useState("")
  const [ dcError, setDcError ] = useState(false)
  const [ dcHelperText, setDcHelperText ] = useState("")
  const [ dcList, setDcList ] = useState([])
  const [ errors, setErrors ] = useState({})


  const handleClick = async () => {
    const ipError = await ipCheck()
    const dcError = await dcCheck()
    if (ipError || dcError || saving) return
    setSaving(true)
    API.create({ ip, dc, hostname, projectTeam, networkType, ipPool, vlanId, remark })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: listPath })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  // 获取 dcList
  useEffect(() => {
    dcAPI.list().then(({ data }) => {
      if (data) {
        setDcList(data.data)
      }
    })
  }, [])

  useEffect(() => {
    const list = [
      {
        id: 'ip', label: L('IP'), type: 'text', value: ip,
        error: ipError, helperText: ipHelperText, required: true, readOnly: false
      },
      {
        id: 'dc', label: L('DC'), type: 'select', value: dc,
        itemList: dcList, labelField: 'name', valueField: 'id',
        error: dcError, helperText: dcHelperText, required: true, readOnly: false
      },
      { id: 'hostname', label: L('Hostname'), type: 'text', required: false, readOnly: false, value: hostname },
      { id: 'projectTeam', label: L('Project Team'), type: 'text', required: false, readOnly: false, value: projectTeam },
      { id: 'networkType', label: L('Network Type'), type: 'text', required: false, readOnly: false, value: networkType },
      { id: 'ipPool', label: L('IP Pool'), type: 'text', required: false, readOnly: false, value: ipPool },
      { id: 'vlanId', label: L('VLan ID'), type: 'text', required: false, readOnly: false, value: vlanId },
      { id: 'remark', label: L('Remark'), type: 'text', required: false, readOnly: false, value: remark },
    ]
    setFormFieldList(list)
    // eslint-disable-next-line
  }, [ dcList ])

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
    const emptyCheck = checkEmpty("ip", ip)
    setIpError(emptyCheck.error)
    setIpHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, ip)
      setIpError(error)
      setIpHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const dcCheck = async () => {
    const emptyCheck = checkEmpty("DC", dc)
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

export default Create
