import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenantQuotaMapping"
import CommonTip from "../../../../../components/CommonTip"
import { L } from '../../../../../utils/lang'
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckTypeExist, getCheckYearExist } from "../../untils/ManagementFieldCheck"
import tenantApi from "../../../../../api/tenant"


function Create(props) {
  const { map } = props
  const history = useHistory()
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
  const [ errors, setErrors ] = useState({})

  useEffect(() => {
    tenantApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        return data.data.rows
      } else {
        return []
      }
    }).then(returnObj => {
      const list = [
        {
          id: 'tenant', label: L('Tenant'), type: 'select', value: "", required: true,
          itemList: returnObj, labelField: 'name', valueField: 'id',
          error: tenantError, helperText: tenantHelperText,
        },
        {
          id: 'type', label: L('Type'), required: true, readOnly: false, value: "",
          error: typeError, helperText: typeHelperText,
        },
        {
          id: 'quota', label: L('Quota'), required: true, type: 'text', value: "",
          error: quotaError, helperText: quotaHelperText,
        },
        {
          id: 'year', label: L('Year'), required: true, type: 'date', views: [ 'year' ],
          readOnly: false, value: "", error: yearError, helperText: yearHelperText,
        },
      ]
      setFormFieldList(list)
    })
  }, [])

  const handleClick = async () => {
    const tenantError = await tenantCheck()
    const typeError = await typeCheck()
    const quotaError = await quotaCheck()
    const yearError = await yearCheck()
    if (tenantError || typeError || quotaError || yearError || saving) return
    setSaving(true)
    API.create({
      tenantId: map.get("tenantId"),
      type: map.get("type"),
      quota: map.get("quota"),
      year: map.get("year"),
    })
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/aaa-service/tenantQuotaMapping/' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    const errors = {
      tenant: {
        error: tenantError,
        helperText: tenantHelperText,
      },
      type: {
        error: typeError,
        helperText: typeHelperText,
      },
      quota: {
        error: quotaError,
        helperText: quotaHelperText,
      },
      year: {
        error: yearError,
        helperText: yearHelperText,
      },
    }
    setErrors(errors)
    // eslint-disable-next-line
  }, [
    tenantHelperText,
    typeHelperText,
    quotaHelperText,
    yearHelperText
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'tenant':
        map.set("tenantId", value)
        break
      case 'type':
        map.set("type", value)
        break
      case 'quota':
        map.set("quota", value)
        break
      case 'year':
        map.set("year", value)
        break
      default:
        break
    }
  }

  const tenantCheck = async () => {
    const emptyCheck = checkEmpty("Tenant", map.get("tenantId"))
    setTenantError(emptyCheck.error)
    setTenantHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const typeCheck = async () => {
    const emptyCheck = checkEmpty("Type", map.get("type"))
    setTypeError(emptyCheck.error)
    setTypeHelperText(emptyCheck.msg)
    if (!emptyCheck.error && !tenantError) {
      const checkExist = getCheckTypeExist()
      const { error, msg } = await checkExist(0, { tenantId: map.get("tenantId"), type: map.get("type") })
      setTypeError(error)
      setTypeHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const yearCheck = async () => {
    const emptyCheck = checkEmpty("Year", map.get("year"))
    setYearError(emptyCheck.error)
    setYearHelperText(emptyCheck.msg)
    if (!emptyCheck.error && !tenantError) {
      const checkExist = getCheckYearExist()
      const { error, msg } = await checkExist(0, { tenantId: map.get("tenantId"), year: map.get("year") })
      setYearError(error)
      setYearHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const quotaCheck = () => {
    const emptyCheck = checkEmpty("Quota", map.get("quota"))
    setQuotaError(emptyCheck.error)
    setQuotaHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const reg = /^[1-9]\d*$/
      if (!reg.test(map.get("quota"))) {
        setQuotaError(true)
        setQuotaHelperText(L('Only accept positive integer'))
        return true
      }
    }
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
      />
    </React.Fragment>
  )
}

export default Create
