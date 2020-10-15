import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"
import dayjs from "dayjs"

import DetailPage from "../../../../../components/DetailPage"
import CommonTip from "../../../../../components/CommonTip"
import ADGroupApi from "../../../../../api/adGroup"
import { checkEmpty, getCheckExist } from "../../untils/ADGroupCheck"
import { L } from '../../../../../utils/lang'
const listPath = '/aaa-service/adgroup'
const formTitle = 'Update'

function Update(props) {
  const { onMount } = props
  const { id } = useParams()
  const history = useHistory()
  const [ name, setName ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ nameError, setNameError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")
  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('DD-MMM-YYYY HH:mm')
  }

  useEffect(() => {
    onMount('update')
    // eslint-disable-next-line
  }, [])

  const hanleClick = async () => {
    const nameErr = await nameCheck()
    if (nameErr || saving) return
    setSaving(true)
    ADGroupApi.update(id, { name })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: listPath })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    ADGroupApi.detail(id).then(({ data }) => {
      const { name, createdAt, updatedAt } = data.data
      setName(name)
      setCreatedAt(createdAt)
      setUpdastedAt(updatedAt)
      setSaving(false)
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'name', label: L('Name'), type: 'text', required: true, readOnly: false, value: name, error: nameError, helperText: nameHelperText },
      { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ name, createdAt, updatedAt, nameError, nameHelperText ])
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'name':
        setName(value)
        break
      default:
        break
    }
  }
  const nameCheck = async () => {
    const emptyCheck = checkEmpty("name", name)
    setNameError(emptyCheck.error)
    setNameHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(id, name)
      setNameError(error)
      setNameHelperText(msg)
      return error
    }
    return emptyCheck.error
  }
  const onFormFieldBlur = (_, id) => {
    switch (id) {
      case "name":
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
