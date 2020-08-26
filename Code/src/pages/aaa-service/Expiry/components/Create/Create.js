import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/expiry"
import CommonTip from "../../../../../components/CommonTip"
import { checkEmpty, getCheckExist } from "../../untils/expiryFieldCheck"
import assignApi from "../../../../../api/assign"
import userApi from "../../../../../api/user"
import dayjs from "dayjs"


function AssignCreate(props) {
  const { onMount } = props
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
  const [ assignInit, setAssignInit ] = useState(false)
  const [ userInit, setUserInit ] = useState(false)
  const [ expiryDateInit, setExpiryDateInit ] = useState(false)

  // 用于更新面包屑
  useEffect(() => {
    onMount('create')
    // eslint-disable-next-line
  }, [])


  const handleClick = async () => {
    const assignError = await assignCheck()
    const userError = await userCheck()
    const expiryDateError = await expiryDateCheck()
    if (assignError || userError || expiryDateError || saving) return
    setSaving(true)
    API.create({ assignId, userId, expiryDate })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: '/aaa-service/expiry' })
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
        id: 'assign', label: 'Tenant + Group + Role', type: 'select', value: assignId,
        itemList: assignList, labelField: 'value', valueField: 'id', width: 1.4,
        error: assignError, helperText: assignHelperText, labelWidth: 150,
      },
      {
        id: 'user', label: 'User', type: 'select', value: userId,
        itemList: userList, labelField: 'displayname', valueField: 'id',
        error: userError, helperText: userHelperText, labelWidth: 30,
      },
      { id: 'expiryDate', label: 'Expiry Date', type: 'date', disabled: false, readOnly: false,
        required: true, value: expiryDate, error: expiryDateError, helperText: expiryDateHelperText },
    ]
    setFormFieldList(list)
  }, [
    assignId,
    userId,
    expiryDate,
    assignList,
    userList,
    assignError,
    userError,
    expiryDateError,
    assignHelperText,
    userHelperText,
    expiryDateHelperText
  ])

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

  // 字段 assign 检查
  useEffect(() => {
    if (assignInit) {
      assignCheck()
    } else {
      setAssignInit(true)
    }
    // eslint-disable-next-line
  }, [assignId])

  // 字段 user 检查
  useEffect(() => {
    if (userInit) {
      userCheck()
    } else {
      setUserInit(true)
    }
    // eslint-disable-next-line
  }, [userId])

  // 字段 expiryDateCheck 检查
  useEffect(() => {
    if (expiryDateInit) {
      expiryDateCheck()
    } else {
      setExpiryDateInit(true)
    }
    // eslint-disable-next-line
  }, [expiryDate])

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Expiry Create'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default AssignCreate
