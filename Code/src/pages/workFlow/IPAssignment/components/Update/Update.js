import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"

import DetailPage from "../../../../../components/DetailPage"
import CommonTip from "../../../../../components/CommonTip"
import API from "../../../../../api/IPAssignment"
import { checkEmpty } from "../../untils/IPAssignmentCheck"

const listPath = '/workflow/IPAssignment'
const formTitle = 'IP Assignment Update'

function Update(props) {
  const { onMount } = props
  const { id } = useParams()
  const history = useHistory()
  const [ ip, setIP ] = useState('')
  const [ dc, setDC ] = useState('')
  const [ hostname, setHostname ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ nameError, setNameError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")
  

  useEffect(() => {
    onMount('update')
    // eslint-disable-next-line
  }, [])

  const hanleClick = async () => {
    const nameErr = await nameCheck()
    if (nameErr || saving) return
    setSaving(true)
    API.update(id, { ip, dc, hostname})
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: listPath })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      console.log(data.data)
      const { ip, dc, hostname } = data.data
      setIP(ip)
      setDC(dc)
      setHostname(hostname)
      setSaving(false)
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'ip', label: 'IP', type: 'text', required: true, readOnly: false, value: ip, error: nameError, helperText: nameHelperText },
      { id: 'dc', label: 'DC', type: 'text', required: false, readOnly: false, value: dc, error: nameError, helperText: nameHelperText },
      { id: 'hostname', label: 'Hostname', type: 'text', required: false, readOnly: false, value: hostname, error: nameError, helperText: nameHelperText },
    ]
    setFormFieldList(list)
  }, [ ip, dc, hostname, nameError, nameHelperText ])

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
    //   const { error, msg } = await checkExist(id, name)
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
        onBtnClick = {hanleClick}
      />
    </React.Fragment>
  )
}

export default Update
