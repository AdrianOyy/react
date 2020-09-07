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
  const [ nameError, setNameError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")
  const [ typeId, setTypeId ] = useState('')
  const [ typeIdError, setTypeIdError ] = useState(false)
  const [ typeIdHelperText, setTypeIdHelperText ] = useState("")
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ typeList, setTypeList ] = useState([])

  useEffect(() => {
    onMount('create')
    // eslint-disable-next-line
  }, [])

  const handleClick = async () => {
    const nameError = await nameCheck()
    const typeIdErr = await typeIdCheck()
    if (nameError || typeIdErr || saving) return
    setSaving(true)
    API.create({ name, typeId })
      .then(() => {
        CommonTip.success("Success")
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
        console.log(rows)
        setTypeList(rows)
      }
    })
  }, [])
  useEffect(() => {
    const list = [
      {
        id: 'name', label: 'Name', type: 'text',
        required: true, readOnly: false, value: name,
        error: nameError, helperText: nameHelperText
      },
      {
        id: 'typeId', label: 'Type', type: 'select',
        value: typeId, itemList: typeList,
        labelField: 'name', valueField: 'id',
        error: typeIdError, helperText: typeIdHelperText,
      },
    ]
    setFormFieldList(list)
  }, [
    name, nameError, nameHelperText,
    typeId, typeIdError, typeIdHelperText,
    typeList,
  ])
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

  const onFormFieldBlur = (_, id) => {
    switch (id) {
      case "name":
        nameCheck()
        break
      case "typeId":
        typeIdCheck()
        break
      default:
        break
    }
  }
  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Create'
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
