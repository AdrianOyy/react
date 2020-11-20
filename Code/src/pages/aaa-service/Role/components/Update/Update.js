import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import roleApi from "../../../../../api/role"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/RoleFieldCheck"
import { L } from '../../../../../utils/lang'

function Detail() {
  const { id } = useParams()
  const history = useHistory()
  const [ label, setLabel ] = useState('')
  const [ value, setValue ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ labelError, setLabelError ] = useState(false)
  const [ labelHelperText, setLabelHelperText ] = useState("")
  const [ valueError, setValueError ] = useState(false)
  const [ valueHelperText, setValueHelperText ] = useState("")
  const [ errors, setErrors ] = useState({})


  const handleClick = async () => {
    const labelError = await labelCheck()
    const valueError = valueCheck()
    if (labelError || valueError ||  saving) return
    setSaving(true)
    roleApi.update(id, { label, value })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/aaa-service/role' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    roleApi.detail(id).then(({ data }) => {
      const { label, value } = data.data
      setLabel(label)
      setValue(value)
      setSaving(false)

      const defaultValue = data.data
      const list = [
        { id: 'label', label: L('Label'), type: 'text', required: true, readOnly: false, value: defaultValue.label, error: labelError, helperText: labelHelperText },
        {
          id: 'value', label: L('Value'), type: 'select', value, required: true,
          itemList: [
            { name: "Read Only", id: "Read Only" },
            { name: "Read & Write", id: "Read && Write" },
          ],
          labelField: 'name',
          valueField: 'id',
          error: valueError,
          helperText: valueHelperText
        },
        { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(defaultValue.createdAt) },
        { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(defaultValue.updatedAt) },
      ]
      setFormFieldList(list)
    })
    // eslint-disable-next-line
  }, [ id ])

  useEffect(() => {
    const errors = {
      label: {
        error: labelError,
        helperText: labelHelperText,
      },
      value: {
        error: valueError,
        helperText: valueHelperText,
      },
    }
    setErrors(errors)
  }, [ labelError, labelHelperText, valueError, valueHelperText ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'label':
        setLabel(value)
        break
      case 'value':
        setValue(value)
        break
      default:
        break
    }
  }
  const labelCheck = async () => {
    const emptyCheck = checkEmpty("label", label)
    setLabelError(emptyCheck.error)
    setLabelHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(id, label)
      setLabelError(error)
      setLabelHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const valueCheck = () => {
    const { error, msg } = checkEmpty("value", value)
    setValueError(error)
    setValueHelperText(msg)
  }

  const onFormFieldBlur = (_, id) => {
    switch (id) {
      case "label":
        labelCheck()
        break
      default:
        break
    }
  }
  return (
    <React.Fragment>
      <DetailPage
        formTitle={L('Update')}
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {formFieldList}
        errorFieldList = {errors}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Detail
