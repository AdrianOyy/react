import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import roleApi from "../../../../../api/role"
import CommonTip from "../../../../../components/CommonTip"
import { L } from '../../../../../utils/lang'
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/RoleFieldCheck"


function RoleCreate(props) {
  const history = useHistory()
  const [ label, setLabel ] = useState('')
  const [ value, setValue ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ labelError, setLabelError ] = useState(false)
  const [ labelHelperText, setLabelHelperText ] = useState("")
  const [ valueError, setValueError ] = useState(false)
  const [ valueHelperText, setValueHelperText ] = useState("")
  const [ valueInit, setValueInit ] = useState(false)

  useEffect(() => {
    if (valueInit) {
      valueCheck()
    } else {
      setValueInit(true)
    }
    // eslint-disable-next-line
  }, [value])

  const handleClick = async () => {
    const labelError = await labelCheck()
    const valueError = valueCheck()
    if (labelError || valueError ||  saving) return
    setSaving(true)
    roleApi.create({ label, value })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: '/aaa-service/role' })
      })
      .catch(() => {
        setSaving(false)
      })
  }
  useEffect(() => {
    const list = [
      { id: 'label', label: L('Label'), type: 'text', required: true, readOnly: false, value: label, error: labelError, helperText: labelHelperText },
      {
        id: 'value',
        label: L('Value'),
        type: 'select',
        value,
        itemList: [
          { name: L("Read Only"), id: "Read Only" },
          { name: L("Read & Write"), id: "Read && Write" },
        ],
        labelField: 'name',
        valueField: 'id',
        error: valueError,
        helperText: valueHelperText
      },
    ]
    setFormFieldList(list)
  }, [ label, labelError, labelHelperText, value, valueError, valueHelperText ])
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
      const { error, msg } = await checkExist(0, label)
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
        formTitle={L('Create')}
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default RoleCreate
