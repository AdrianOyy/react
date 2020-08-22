import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import assignApi from "../../../../../api/assign"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty } from "../../untils/assignFieldCheck"
import roleApi from "../../../../../api/role"
import API from "../../../../../api/assign"

const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
}

function AssignUpdate(props) {
  const { onMount } = props
  const { id } = useParams()
  const history = useHistory()
  const [ tenant, setTenant ] = useState('')
  const [ group, setGroup ] = useState('')
  const [ roleId, setRoleId ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ roleError, setRoleError ] = useState(false)
  const [ roleHelperText, setRoleHelperText ] = useState("")
  const [ roleList, setRoleList ] = useState([])
  const [ roleInit, setRoleInit ] = useState(false)

  useEffect(() => {
    onMount('update')
    // eslint-disable-next-line
  }, [])

  // 获取 roleList
  useEffect(() => {
    roleApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setRoleList(rows)
      }
    })
  }, [])

  const roleCheck = async () => {
    const emptyCheck = checkEmpty("role", roleId)
    setRoleError(emptyCheck.error)
    setRoleHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  // 字段 role 检查
  useEffect(() => {
    if (roleInit) {
      roleCheck()
    } else {
      setRoleInit(true)
    }
    // eslint-disable-next-line
  }, [roleId])

  const handleClick = async () => {
    const roleError = await roleCheck()
    if (roleError || saving) return
    setSaving(true)
    assignApi.update(id, { roleId })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: '/aaa-service/assign' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      if (data && data.data) {
        const { role, tenant_group_mapping, createdAt, updatedAt } = data.data
        const { ad_group, tenant } = tenant_group_mapping
        if (tenant && tenant.name) {
          setTenant(tenant.name)
        }
        if (ad_group && ad_group.name) {
          setGroup(ad_group.name)
        }
        if (role && role.id) {
          setRoleId(role.id)
        }
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
      }
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'tenant', label: 'Tenant', type: 'text', disabled: true, readOnly: true, value: tenant },
      { id: 'adGroup', label: 'AD Group', type: 'text', disabled: true, readOnly: true, value: group },
      {
        id: 'role', label: 'Role', type: 'select', required: true,
        readOnly: false, value: roleId, error: roleError, helperText: roleHelperText,
        itemList: roleList, labelField: "label", valueField: "id"
      },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ tenant, group, roleId, roleError, roleHelperText, roleList, createdAt, updatedAt ])

  // 字段改变
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'role':
        setRoleId(value)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Assign Update'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default AssignUpdate
