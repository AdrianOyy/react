import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import roleApi from "../../../../../api/role"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/RoleFieldCheck"
import { L } from '../../../../../utils/lang'

function TenantDetail(props) {
  const { id } = useParams()
  const history = useHistory()
  const [ label, setLabel ] = useState('')
  const [ value, setValue ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ labelError, setLabelError ] = useState(false)
  const [ labelHelperText, setLabelHelperText ] = useState("")


  const hanleClick = async () => {
    const labelErr = await labelCheck()
    if (labelErr || saving) return
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
      const { label, value, createdAt, updatedAt } = data.data
      setLabel(label)
      setValue(value)
      setCreatedAt(createdAt)
      setUpdastedAt(updatedAt)
      setSaving(false)
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'label', label: L('Label'), type: 'text', required: true, readOnly: false, value: label, error: labelError, helperText: labelHelperText },
      {
        id: 'value', label: L('Value'), type: 'select', value,
        itemList: [
          { label: "Read Only", value: "Read Only" },
          { label: "Read & Write", value: "Read && Write" },
        ]
      },
      { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ label, labelError, labelHelperText, value, createdAt, updatedAt ])
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
        showBtn ={true}
        onBtnClick = {hanleClick}
      />
    </React.Fragment>
  )
}

export default TenantDetail
