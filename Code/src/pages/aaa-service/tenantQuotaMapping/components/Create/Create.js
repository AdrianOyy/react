import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenantQuotaMapping"
import CommonTip from "../../../../../components/CommonTip"
import { L } from '../../../../../utils/lang'
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckTypeExist, getCheckYearExist } from "../../untils/ManagementFieldCheck"
import tenantApi from "../../../../../api/tenant"


function Create() {
  const history = useHistory()
  const [ tenantId, setTenantId ] = React.useState('')
  const [ type, setType ] = useState('')
  const [ quota, setQuota ] = useState('')
  const [ year, setYear ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ tenantError, setTenantError ] = useState(false)
  const [ tenantHelperText, setTenantHelperText ] = useState(false)
  const [ typeError, setTypeError ] = useState(false)
  const [ typeHelperText, setTypeHelperText ] = useState("")
  const [ quotaError, setQuotaError ] = useState(false)
  const [ quotaHelperText, setQuotaHelperText ] = useState('')
  const [ yearError, setYearError ] = useState(false)
  const [ yearHelperText, setYearHelperText ] = useState('')
  const [ tenantInit, setTenantInit ] = useState(false)
  const [ typeInit, setTypeInit ] = useState(false)
  const [ yearInit, setYearInit ] = useState(false)
  const [ quotaInit, setQuotaInit ] = useState(false)
  const [ tenantList, setTenantList ] = useState([])

  // 获取 tenantList
  useEffect(() => {
    tenantApi.list({ limit: 999, page: 1 })
      .then(({ data }) => {
        if (data && data.data) {
          const { rows } = data.data
          setTenantList(rows)
        }
      })
  }, [])

  const handleClick = async () => {
    const tenantError = await tenantCheck()
    const typeError = await typeCheck()
    const quotaError = await quotaCheck()
    const yearError = await yearCheck()
    if (tenantError || typeError || quotaError || yearError || saving) return
    setSaving(true)
    API.create({ tenantId, type, quota, year })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/aaa-service/tenantQuotaMapping/' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    const list = [
      {
        id: 'tenant', label: L('Tenant'), type: 'select', value: tenantId,
        itemList: tenantList, labelField: 'name', valueField: 'id',
        error: tenantError, helperText: tenantHelperText,
      },
      {
        id: 'type', label: L('Type'), required: true, readOnly: false, value: type,
        error: typeError, helperText: typeHelperText,
      },
      {
        id: 'quota', label: L('Quota'), required: true, type: 'text', value: quota,
        error: quotaError, helperText: quotaHelperText,
      },
      {
        id: 'year', label: L('Year'), required: true, type: 'date', views: [ 'year' ],
        readOnly: false, value: year, error: yearError, helperText: yearHelperText,
      },
    ]
    setFormFieldList(list)
  }, [
    tenantId, tenantList, type, year, quota,
    typeError, typeHelperText, yearError, yearHelperText,
    quotaError, quotaHelperText, tenantError, tenantHelperText
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'tenant':
        setTenantId(value)
        break
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

  const tenantCheck = async () => {
    const emptyCheck = checkEmpty("Tenant", tenantId)
    setTenantError(emptyCheck.error)
    setTenantHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const typeCheck = async () => {
    const emptyCheck = checkEmpty("Type", type)
    setTypeError(emptyCheck.error)
    setTypeHelperText(emptyCheck.msg)
    if (!emptyCheck.error && !tenantError) {
      const checkExist = getCheckTypeExist()
      const { error, msg } = await checkExist(0, { tenantId, type })
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
    if (!emptyCheck.error && !tenantError) {
      const checkExist = getCheckYearExist()
      const { error, msg } = await checkExist(0, { tenantId, year })
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
        setQuotaHelperText(L('Only accept positive integer'))
        return true
      }
    }
    return emptyCheck.error
  }

  useEffect(() => {
    if (tenantInit) {
      tenantCheck()
    } else {
      setTenantInit(true)
    }
    // eslint-disable-next-line
  }, [tenantId])

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

  return (
    <React.Fragment>
      <DetailPage
        formTitle={L('Create')}
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Create
