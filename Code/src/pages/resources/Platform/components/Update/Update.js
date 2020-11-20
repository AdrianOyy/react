import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/platform"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/PlatformFieldCheck"
import { L } from '../../../../../utils/lang'

function Update() {
  const { id } = useParams()
  const history = useHistory()
  const [ name, setName ] = useState('')
  const [ nameError, setNameError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")
  const [ typeId, setTypeId ] = useState('')
  const [ typeIdError, setTypeIdError ] = useState(false)
  const [ typeIdHelperText, setTypeIdHelperText ] = useState("")
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ errors, setErrors ] = useState({})

  const hanleClick = async () => {
    const nameErr = await nameCheck()
    const typeIdErr = await typeIdCheck()
    if (nameErr || typeIdErr || saving) return
    setSaving(true)
    API.update(id, { name, typeId })
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
        return data.data.rows
      } else {
        return []
      }
    }).then(returnObj => {
      API.detail(id).then(({ data }) => {
        const { name, typeId }  = data.data
        setName(name)
        setTypeId(typeId)
        setSaving(false)

        const defaultValue = data.data
        const list = [
          {
            id: 'name', label: L('Name'), type: 'text',
            required: true, readOnly: false, value: defaultValue.name,
            error: nameError, helperText: nameHelperText
          },
          {
            id: 'typeId', label: L('Type'), type: 'select',
            value: defaultValue.typeId, itemList: returnObj,
            labelField: 'name', valueField: 'id', required: true,
            error: typeIdError, helperText: typeIdHelperText,
          },
          {
            id: 'createdAt', label: L('Created At'), type: 'text',
            disabled: true, readOnly: true, value: formatDateTime(defaultValue.createdAt)
          },
          {
            id: 'updatedAt', label: L('Updated At'), type: 'text',
            disabled: true, readOnly: true, value: formatDateTime(defaultValue.updatedAt)
          },
        ]
        setFormFieldList(list)
      })
    })
    // eslint-disable-next-line
  }, [ id ])

  useEffect(() => {
    const errors = {
      name: {
        error: nameError,
        helperText: nameHelperText,
      },
      typeId: {
        error: typeIdError,
        helperText: typeIdHelperText,
      },
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
      const { error, msg } = await checkExist(id, name)
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
        onBtnClick = {hanleClick}
      />
    </React.Fragment>
  )
}

export default Update
