import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/platform"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/PlatformFieldCheck"


function Create(props) {
  const { onMount } = props
  const history = useHistory()
  const [ name, setName ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ nameError, setNameError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")

  useEffect(() => {
    onMount('create')
    // eslint-disable-next-line
  }, [])

  const handleClick = async () => {
    const nameError = await nameCheck()
    if (nameError || saving) return
    setSaving(true)
    API.create({ name })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: '/resources/platform' })
      })
      .catch(() => {
        setSaving(false)
      })
  }
  useEffect(() => {
    const list = [
      { id: 'name', label: 'Name', type: 'text', required: true, readOnly: false, value: name, error: nameError, helperText: nameHelperText },
    ]
    setFormFieldList(list)
  }, [ name, nameError, nameHelperText ])
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
        formTitle = 'Platform Create'
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Create
