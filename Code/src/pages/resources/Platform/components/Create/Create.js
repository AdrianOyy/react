import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/platform"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/PlatformFieldCheck"
import { L } from '../../../../../utils/lang'


function Create() {
  const history = useHistory()
  const [ name, setName ] = useState('')
  const [ nameError, setNameError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")
  const [ typeId, setTypeId ] = useState('')
  const [ typeIdError, setTypeIdError ] = useState(false)
  const [ typeIdHelperText, setTypeIdHelperText ] = useState("")
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ typeList, setTypeList ] = useState([])
  const [ errors, setErrors ] = useState({})

  const handleClick = async () => {
    const nameError = await nameCheck()
    const typeIdErr = await typeIdCheck()
    if (nameError || typeIdErr || saving) return
    setSaving(true)
    API.create({ name, typeId })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/resources/platform' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.listType({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setTypeList(rows)
      }
    })
  }, [])

  useEffect(() => {
    const list = [
      {
        id: 'name', label: L('Name'), type: 'text',
        required: true, readOnly: false, value: name,
        error: nameError, helperText: nameHelperText
      },
      {
        id: 'typeId', label: L('Type'), type: 'select', required: true,
        value: typeId, itemList: typeList,
        labelField: 'name', valueField: 'id',
        error: typeIdError, helperText: typeIdHelperText,
      },
    ]
    setFormFieldList(list)
    // eslint-disable-next-line
  }, [ typeList ])

  useEffect(() => {
    const errors = {
      name: {
        error: nameError,
        helperText: nameHelperText,
      },
      typeId: {
        error: typeIdError,
        helperText: typeIdHelperText,
      }
    }
    setErrors(errors)
    // eslint-disable-next-line
  }, [ nameHelperText, typeIdHelperText ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'name':
        setName(value)
        break
      case 'typeId':
        setTypeId(value)
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

  const typeIdCheck = async () => {
    const emptyCheck = checkEmpty("typeId", typeId)
    setTypeIdError(emptyCheck.error)
    setTypeIdHelperText(emptyCheck.msg)
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
