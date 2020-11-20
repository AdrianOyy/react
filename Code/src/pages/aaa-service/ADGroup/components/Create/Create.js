import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import DetailPage from "../../../../../components/DetailPage"
import CommonTip from "../../../../../components/CommonTip"
import ADGroupApi from "../../../../../api/adGroup"
import { checkEmpty, getCheckExist } from "../../untils/ADGroupCheck"
import { L } from '../../../../../utils/lang'
const listPath = '/aaa-service/adgroup'
const formTitle = 'Create'

function Create() {
  const history = useHistory()
  const [ name, setName ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ nameError, setNameError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")
  const [ errors, setErrors ] = useState({})


  const handelClick = async () => {
    const nameErr = await nameCheck()
    if (nameErr || saving) return
    setSaving(true)
    ADGroupApi.create({ name })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: listPath })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    const list = [
      { id: 'name', label: L('Name'), type: 'text', required: true, readOnly: false, value: name, error: nameError, helperText: nameHelperText },
    ]
    setFormFieldList(list)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const errors = {
      name: {
        error: nameError,
        helperText: nameHelperText,
      }
    }
    setErrors(errors)
  }, [ nameError, nameHelperText ])

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
      const { error, msg } = await checkExist(0, name)
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
        errorFieldList = {errors}
        showBtn ={true}
        onBtnClick = {handelClick}
      />
    </React.Fragment>
  )
}

export default Create
