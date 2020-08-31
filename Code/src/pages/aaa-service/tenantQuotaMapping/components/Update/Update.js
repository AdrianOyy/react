import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenantQuotaMapping"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckTypeExist, getCheckYearExist } from "../../untils/ManagementFieldCheck"

const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('DD-MMM-YYYY HH:mm')
}


function ManagementUpdate(props) {
  const { onMount } = props
  const { id } = useParams()
  const history = useHistory()
  const [ tenantId, setTenantId ] = useState('')
  const [ tenant, setTenant ] = useState('')
  const [ type, setType ] = useState('')
  const [ quota, setQuota ] = useState('')
  const [ year, setYear ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdatedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ typeError, setTypeError ] = useState(false)
  const [ typeHelperText, setTypeHelperText ] = useState("")
  const [ quotaError, setQuotaError ] = useState(false)
  const [ quotaHelperText, setQuotaHelperText ] = useState('')
  const [ yearError, setYearError ] = useState(false)
  const [ yearHelperText, setYearHelperText ] = useState('')
  const [ typeInit, setTypeInit ] = useState(false)
  const [ yearInit, setYearInit ] = useState(false)
  const [ quotaInit, setQuotaInit ] = useState(false)

  // 用于更新面包屑
  useEffect(() => {
    onMount('update')
    // eslint-disable-next-line
  }, [])

  const typeCheck = async () => {
    const emptyCheck = checkEmpty("Type", type)
    setTypeError(emptyCheck.error)
    setTypeHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckTypeExist()
      const { error, msg } = await checkExist(id, { tenantId, type })
      setTypeError(error)
      setTypeHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const yearCheck = async () => {
    const emptyCheck = checkEmpty("Year", year)
    setYearError(emptyCheck.error)
    setYearHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckYearExist()
      const { error, msg } = await checkExist(id, { tenantId, year })
      setYearError(error)
      setYearHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const quotaCheck = () => {
    const emptyCheck = checkEmpty("Quota", quota)
    setQuotaError(emptyCheck.error)
    setQuotaHelperText(emptyCheck.msg)
    if (!emptyCheck.errpr) {
      const reg = /^[1-9]\d*$/
      if (!reg.test(quota)) {
        setQuotaError(true)
        setQuotaHelperText('Only accept positive integer')
        return true
      }
    }
    return emptyCheck.error
  }

  // 字段 type 检查
  useEffect(() => {
    if (typeInit) {
      typeCheck()
    } else {
      setTypeInit(true)
    }
    // eslint-disable-next-line
  }, [type])

  // 字段 quota 检查
  useEffect(() => {
    if (quotaInit) {
      quotaCheck()
    } else {
      setQuotaInit(true)
    }
    // eslint-disable-next-line
  }, [quota])

  useEffect(() => {
    if (yearInit) {
      yearCheck()
    } else {
      setYearInit(true)
    }
    // eslint-disable-next-line
  }, [year])

  const handleClick = async () => {
    const typeError = await typeCheck()
    const quotaError = await quotaCheck()
    const yearError = await yearCheck()
    if (typeError || quotaError || yearError || saving) return
    setSaving(true)
    API.update(id, { type, quota, year })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: '/aaa-service/tenantQuotaMapping/' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.detail(id)
      .then(({ data }) => {
        const { tenant, type, quota, year, createdAt, updatedAt } = data.data
        if (tenant) {
          if (tenant.id) {
            setTenantId(tenant.id)
          }
          if (tenant.name) {
            setTenant(tenant.name)
          }
        }
        setType(type)
        setQuota(quota)
        setYear(year.toString())
        setCreatedAt(createdAt)
        setUpdatedAt(updatedAt)
        setSaving(false)
      })
  }, [ id ])

  useEffect(() => {
    const list = [
      {
        id: 'tenant', label: 'Tenant', disabled: true, readOnly: true, value: tenant
      },
      {
        id: 'type', label: 'Type', required: true, readOnly: false, value: type,
        error: typeError, helperText: typeHelperText,
      },
      {
        id: 'quota', label: 'Quota', required: true, type: 'text', value: quota,
        error: quotaError, helperText: quotaHelperText,
      },
      {
        id: 'year', label: 'Year', required: true, type: 'date', views: [ 'year' ],
        readOnly: false, value: year, error: yearError, helperText: yearHelperText,
      },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [
    tenant, type, year, quota, createdAt, updatedAt,
    typeError, typeHelperText, yearError, yearHelperText,
    quotaError, quotaHelperText
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'type':
        setType(value)
        break
      case 'quota':
        setQuota(value)
        break
      case 'year':
        setYear(value)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Tenant_quota_mapping Update'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default ManagementUpdate
