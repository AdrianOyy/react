import React, {useEffect, useState} from 'react'

import DetailPage from "../../../../components/DetailPage"
import roleApi from "../../../../api/role"
import {useParams} from "react-router-dom"
import dayjs from "dayjs"
import CommonTip from "../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import {checkEmpty, getCheckExist} from "../untils/RoleFieldCheck"

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Tenant', path: '/aaa-service/tenant' },
  { title: 'Update' },
]


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
  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }

  const hanleClick = async() => {
    const labelErr = await labelCheck()
    if (labelErr || saving) return
    setSaving(true)
    roleApi.update(id, { label, value })
      .then(() => {
        CommonTip.success("Success")
        history.push({pathname: '/aaa-service/role'})
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
  }, [id])

  useEffect(() => {
    const list = [
      { id: 'label', label: 'Label', type: 'text', required: true, readOnly: false, value: label, error: labelError, helperText: labelHelperText },
      { id: 'value', label: 'Value', isSelector: true, value, itemList: [
          { label: "Read Only", value: "Read Only" },
          { label: "Read & Write", value: "Read && Write" },
        ]},
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  },[label, labelError, labelHelperText, value, createdAt, updatedAt ])
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch(id) {
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
  const onFormFieldBlur = (id) => {
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
        breadcrumbsList = { breadcrumbsList }
        formTitle = 'Tenant Update'
        onFormFieldChange = { onFormFieldChange }
        onFormFieldBlur = { onFormFieldBlur }
        formFieldList = { formFieldList }
        showBtn ={ true }
        onBtnClick = { hanleClick }
      />
    </React.Fragment>
  )
}

export default TenantDetail
