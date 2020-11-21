import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenantQuotaMapping"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"
import CommonTip from "../../../../../components/CommonTip"
import { L } from '../../../../../utils/lang'
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckTypeExist, getCheckYearExist } from "../../untils/ManagementFieldCheck"

function Update(props) {
  const { map } = props
  const { id } = useParams()
  const history = useHistory()
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ typeError, setTypeError ] = useState(false)
  const [ typeHelperText, setTypeHelperText ] = useState("")
  const [ quotaError, setQuotaError ] = useState(false)
  const [ quotaHelperText, setQuotaHelperText ] = useState('')
  const [ yearError, setYearError ] = useState(false)
  const [ yearHelperText, setYearHelperText ] = useState('')
  const [ errors, setErrors ] = useState({})

  const handleClick = async () => {
    const typeError = await typeCheck()
    const quotaError = await quotaCheck()
    const yearError = await yearCheck()
    if (typeError || quotaError || yearError || saving) return
    setSaving(true)
    API.update(id, {
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
    API.detail(id)
      .then(({ data }) => {
        const { tenant, type, quota, year, createdAt, updatedAt } = data.data
        if (tenant) {
          if (tenant.id) {
            map.set("tenantId", tenant.id)
          }
        }
        map.set("type", type)
        map.set("quota", quota)
        map.set("year", year.toString())
        setSaving(false)

        const list = [
          {
            id: 'tenant', label: L('Tenant'), disabled: true, readOnly: true, value: tenant ? tenant.name : ''
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
          { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
          { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
        ]
        setFormFieldList(list)
      })
  }, [ id ])

  useEffect(() => {
    const errors = {
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
    typeHelperText,
    quotaHelperText,
    yearHelperText
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
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

  const typeCheck = async () => {
    const emptyCheck = checkEmpty("Type", map.get("type"))
    setTypeError(emptyCheck.error)
    setTypeHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
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
    if (!emptyCheck.error) {
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

export default Update
