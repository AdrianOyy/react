import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/expiry"
import CommonTip from "../../../../../components/CommonTip"
import { checkEmpty, getCheckExist } from "../../untils/expiryFieldCheck"
import assignApi from "../../../../../api/assign"
import { L } from '../../../../../utils/lang'
import userApi from "../../../../../api/user"
import dayjs from "dayjs"


export default function Create() {
  const history = useHistory()
  const [ assignId, setAssignId ] = useState('')
  const [ userId, setUserId ] = useState('')
  const [ expiryDate, setExpiryDate ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ assignError, setAssignError ] = useState(false)
  const [ assignHelperText, setAssignHelperText ] = useState("")
  const [ assignList, setAssignList ] = useState([])
  const [ userError, setUserError ] = useState('')
  const [ userHelperText, setUserHelperText ] = useState('')
  const [ userList, setUserList ] = useState([])
  const [ expiryDateError, setExpiryDateError ] = useState(false)
  const [ expiryDateHelperText, setExpiryDateHelperText ] = useState("")
  const [ errors, setErrors ] = useState({})

  const handleClick = async () => {
    const assignError = await assignCheck()
    const userError = await userCheck()
    const expiryDateError = await expiryDateCheck()
    if (assignError || userError || expiryDateError || saving) return
    setSaving(true)
    API.create({ assignId, userId, expiryDate })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  // 获取 assignList 和 userList
  useEffect(() => {
    assignApi.handledList().then(({ data }) => {
      if (data) {
        setAssignList(data.data)
      }
    })

    userApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setUserList(rows)
      }
    })
  }, [])

  useEffect(() => {
    const list = [
      {
        id: 'assign', label: L('Tenant + Group + Role'), type: 'select', value: assignId, required: true,
        itemList: assignList, labelField: 'value', valueField: 'id', width: 1.4,
        error: assignError, helperText: assignHelperText, labelWidth: 150,
      },
      {
        id: 'user', label: L('User'), type: 'select', value: userId, required: true,
        itemList: userList, labelField: 'displayname', valueField: 'id',
        error: userError, helperText: userHelperText, labelWidth: 30,
      },
      {
        id: 'expiryDate', label: L('Expiry Date'), type: 'date', disabled: false, readOnly: false,
        required: true, value: expiryDate, error: expiryDateError, helperText: expiryDateHelperText
      },
    ]
    setFormFieldList(list)
    // eslint-disable-next-line
  }, [ assignList, userList ])

  useEffect(() => {
    const errors = {
      assign: {
        error: assignError,
        helperText: assignHelperText,
      },
      user: {
        error: userError,
        helperText: userHelperText,
      },
      expiryDate: {
        error: expiryDateError,
        helperText: expiryDateHelperText,
      },
    }
    setErrors(errors)
    // eslint-disable-next-line
  }, [ assignHelperText, userHelperText, expiryDateHelperText ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'assign':
        setAssignId(value)
        break
      case 'user':
        setUserId(value)
        break
      case 'expiryDate':
        setExpiryDate(dayjs(new Date(value)).format('YYYY-MM-DD'))
        break
      default:
        break
    }
  }

  const assignCheck = async () => {
    const emptyCheck = checkEmpty("assign", assignId)
    setAssignError(emptyCheck.error)
    setAssignHelperText(emptyCheck.msg)
    if (!emptyCheck.error && !userError) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, { assignId, userId })
      setAssignError(error)
      setAssignHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const userCheck = async () => {
    const emptyCheck = checkEmpty("user", userId)
    setUserError(emptyCheck.error)
    setUserHelperText(emptyCheck.msg)
    if (!emptyCheck.error && !assignError) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, { assignId, userId })
      setUserError(error)
      setUserHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const expiryDateCheck = async () => {
    const emptyCheck = checkEmpty("expiryDate", expiryDate)
    setExpiryDateError(emptyCheck.error)
    setExpiryDateHelperText(emptyCheck.msg)
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
