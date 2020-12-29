import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import roleApi from "../../../../../api/role"
import CommonTip from "../../../../../components/CommonTip"
import { L } from '../../../../../utils/lang'
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/RoleFieldCheck"
import { map2object } from "../../../../../utils/map2object"

function Create(props) {
  const { map } = props
  const history = useHistory()
  // const [ label, setLabel ] = useState('')
  // const [ value, setValue ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ labelError, setLabelError ] = useState(false)
  const [ labelHelperText, setLabelHelperText ] = useState("")
  const [ valueError, setValueError ] = useState(false)
  const [ valueHelperText, setValueHelperText ] = useState("")
  const [ valueInit, setValueInit ] = useState(false)
  const [ errors, setErrors ] = useState({})

  useEffect(() => {
    if (valueInit) {
      valueCheck()
    } else {
      setValueInit(true)
    }
    // eslint-disable-next-line
  }, [])

  const handleClick = async () => {
    const labelError = await labelCheck()
    const valueError = valueCheck()
    if (labelError || valueError ||  saving) return
    setSaving(true)
    roleApi.create(map2object(map))
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
      { id: 'label', label: L('Tenant\'s Group'), type: 'text', required: true, readOnly: false, value: map && map.get('label'), error: labelError, helperText: labelHelperText },
      {
        id: 'value',
        label: L('Right'),
        type: 'select',
        required: true,
        value: map && map.get('value'),
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
    // eslint-disable-next-line
  }, [])

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
    map && map.set(id, value)
    // switch (id) {
    //   case 'label':
    //     setLabel(value)
    //     break
    //   case 'value':
    //     setValue(value)
    //     break
    //   default:
    //     break
    // }
  }
  const labelCheck = async () => {
    const emptyCheck = checkEmpty("label", map && map.get('label'))
    setLabelError(emptyCheck.error)
    setLabelHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, map && map.get('label'))
      setLabelError(error)
      setLabelHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const valueCheck = () => {
    const emptyCheck = checkEmpty("value", map && map.get('value'))
    setValueError(emptyCheck.error)
    setValueHelperText(emptyCheck.msg)
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
        showRequiredField={true}
      />
    </React.Fragment>
  )
}

export default Create
