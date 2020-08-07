import React, {useEffect, useState} from 'react'

import DetailPage from "../../../../components/DetailPage"
import CommonTip from "../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import ADGroupApi from "../../../../api/adGroup"
import {checkEmpty, getCheckExist} from "../untils/ADGroupCheck"

const listPath = '/aaa-service/adgroup'
const formTitle = 'AD Group Create'
const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'AD Group', path: listPath },
  { title: 'Create' },
]


function Create(props) {
  const history = useHistory()
  const [ name, setName ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ nameError, setNameError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")

  const handelClick = async() => {
    const nameErr = await nameCheck()
    if (nameErr || saving) return
    setSaving(true)
    ADGroupApi.create({ name })
      .then(() => {
        CommonTip.success("Success")
        history.push({pathname: listPath})
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
  },[name, nameError, nameHelperText])
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch(id) {
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
  const onFormFieldBlur = (id) => {
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
        breadcrumbsList = { breadcrumbsList }
        formTitle = { formTitle }
        onFormFieldChange = { onFormFieldChange }
        onFormFieldBlur = { onFormFieldBlur }
        formFieldList = { formFieldList }
        showBtn ={ true }
        onBtnClick = { handelClick }
      />
    </React.Fragment>
  )
}

export default Create
