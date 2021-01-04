import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/assign"
import CommonTip from "../../../../../components/CommonTip"
import { checkEmpty, getCheckExist } from "../../untils/assignFieldCheck"
import tenantGroupMappingApi from "../../../../../api/tenantGroupMapping"
import roleApi from "../../../../../api/role"
import { L } from '../../../../../utils/lang'


function Create() {
  const history = useHistory()
  const [ mappingId, setMappingId ] = useState('')
  const [ roleId, setRoleId ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ mappingError, setMappingError ] = useState(false)
  const [ mappingHelperText, setMappingHelperText ] = useState("")
  const [ mappingList, setMappingList ] = useState([])
  const [ roleError, setRoleError ] = useState(false)
  const [ roleHelperText, setRoleHelperText ] = useState("")
  const [ roleList, setRoleList ] = useState([])
  const [ errors, setErrors ] = useState({})

  const handleClick = async () => {
    const mappingError = await mappingCheck()
    const roleError = await roleCheck()
    if (mappingError || roleError || saving) return
    setSaving(true)
    API.create({ mappingId, roleId })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/aaa-service/assign' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  // 获取 mappingList 和 roleList
  useEffect(() => {
    tenantGroupMappingApi.handledList().then(({ data }) => {
      if (data) {
        setMappingList(data.data)
      }
    })

    roleApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setRoleList(rows)
      }
    })
  }, [])

  useEffect(() => {
    const list = [
      {
        id: 'mapping', label: L('Tenant + Group'), type: 'select', value: mappingId, required: true,
        itemList: mappingList, labelField: 'name', valueField: 'id',
        error: mappingError, helperText: mappingHelperText,
      },
      {
        id: 'role', label: L('Role'), type: 'select', value: roleId, required: true,
        itemList: roleList, labelField: 'label', valueField: 'id',
        error: roleError, helperText: roleHelperText,
      },
    ]
    setFormFieldList(list)
    // eslint-disable-next-line
  }, [ mappingList, roleList ])

  useEffect(() => {
    const errors = {
      mapping: {
        error: mappingError,
        helperText: mappingHelperText,
      },
      role: {
        error: roleError,
        helperText: roleHelperText,
      },
    }
    setErrors(errors)
    // eslint-disable-next-line
  }, [ mappingHelperText, roleHelperText ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'mapping':
        setMappingId(value)
        break
      case 'role':
        setRoleId(value)
        break
      default:
        break
    }
  }

  const mappingCheck = async () => {
    const emptyCheck = checkEmpty("mapping", mappingId, "Mapping")
    setMappingError(emptyCheck.error)
    setMappingHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, { mappingId })
      setMappingError(error)
      setMappingHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const roleCheck = async () => {
    const emptyCheck = checkEmpty("role", roleId, "Role")
    setRoleError(emptyCheck.error)
    setRoleHelperText(emptyCheck.msg)
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
