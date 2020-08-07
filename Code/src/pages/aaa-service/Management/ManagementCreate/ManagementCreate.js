import React, {useEffect, useState} from 'react'

import DetailPage from "../../../../components/DetailPage"
import managementApi from "../../../../api/management"
import CommonTip from "../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import {checkEmpty, getCheckExist} from "../untils/ManagementFieldCheck"
import tenantApi from "../../../../api/tenant"
import adGroupApi from "../../../../api/adGroup"

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Management', path: '/aaa-service/management' },
  { title: 'Create' },
]


function ManagemnetCreate(props) {
  const history = useHistory()
  const [tenantId, setTenantId] = React.useState('')
  const [groupId, setGroupId] = React.useState('')
  const [supporter, setSupporter] = useState('')
  const [ resourcesQuota, setResourcesQuota ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ tenantError, setTenantError ] = useState(false)
  const [ groupError, setGroupError ] = useState(false)
  const [ tenantHelperText, setTenantHelperText ] = useState("")
  const [ groupHelperText, setGroupHelperText ] = useState("")
  const [ tenantList, setTenantList] = useState([])
  const [ adGroupList, setAdGroupList] = useState([])
  const [ supporterError, setSupporterError ] = useState(false)
  const [ supporterHelperText, setSupporterHelperText ] = useState("")
  const [ resourcesQuotaError, setResourcesQuotaError ] = useState(false)
  const [ resourcesQuotaHelperText, setResourcesQuotaHelperText ] = useState("")

  const handelClick = async() => {
    const tenantError = await tenantCheck()
    const adGroupError = await groupCheck()
    const supporterError= supporterCheck()
    const resourcesQuotaError = await resourcesQuotaCheck()
    if (tenantError || adGroupError || supporterError || resourcesQuotaError || saving) return
    setSaving(true)
    managementApi.create({ tenantId, groupId, supporter, resourcesQuota })
      .then(() => {
        CommonTip.success("Success")
        history.push({pathname: '/aaa-service/management'})
      })
      .catch(() => {
        setSaving(false)
      })
  }
  // 获取 tenantList 和 gourpList
  useEffect(() =>　{
    tenantApi.list({limit:999, page:1}).then(({data}) => {
      if (data && data.data) {
        const { rows } = data.data
        setTenantList(rows)
      }
    })
    adGroupApi.list({limit:999, page: 1}).then(({data}) => {
      if (data && data.data) {
        const { rows } = data.data
        setAdGroupList(rows)
      }
    })
  },[])
  useEffect(() => {
    const list = [
      {
        id: 'tenant',
        label: 'Tenant',
        isSelector: true,
        value: tenantId,
        itemList: tenantList,
        labelField: 'name',
        valueField: 'id',
        error: tenantError,
        helperText: tenantHelperText,
      },
      {
        id: 'group',
        label: 'AD Group',
        isSelector: true,
        value: groupId,
        itemList: adGroupList,
        labelField: 'name',
        valueField: 'id',
        error: groupError,
        helperText: groupHelperText,
      },
      {
        id: 'supporter',
        label: 'Supporter',
        type: 'text',
        required: true,
        readOnly: false,
        value: supporter,
        error: supporterError,
        helperText: supporterHelperText
      },
      {
        id: 'resourcesQuota',
        label: 'Resources Quota',
        type: 'text',
        required: true,
        readOnly: false,
        value: resourcesQuota,
        error: resourcesQuotaError,
        helperText: resourcesQuotaHelperText
      }
    ]
    setFormFieldList(list)
  },[
    tenantId,
    groupId,
    supporter,
    resourcesQuota,
    tenantList,
    adGroupList,
    tenantError,
    groupError,
    tenantHelperText,
    groupHelperText,
    supporterError,
    supporterHelperText,
    resourcesQuotaError,
    resourcesQuotaHelperText
  ])
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch(id) {
      case 'tenant':
        setTenantId(value)
        break
      case 'group':
        setGroupId(value)
        break
      case 'supporter':
        setSupporter(value)
        break
      case 'resourcesQuota':
        setResourcesQuota(value)
        break
      default:
        break
    }
  }
  const onFormFieldBlur = (id) => {
    switch(id) {
      case 'supporter':
        supporterCheck()
        break
      case 'resourcesQuota':
        resourcesQuotaCheck()
        break
      default:
        break
    }
  }
  const tenantCheck = async () => {
    const emptyCheck = checkEmpty("Tenant", tenantId)
    setTenantError(emptyCheck.error)
    setTenantHelperText(emptyCheck.msg)
    if (!emptyCheck.error && !groupError) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, {tenantId, groupId})
      setTenantError(error)
      setTenantHelperText(msg)
      return error
    }
    return emptyCheck.error
  }
  const groupCheck = async () => {
    const emptyCheck = checkEmpty("AD Group", groupId)
    setGroupError(emptyCheck.error)
    setGroupHelperText(emptyCheck.msg)
    if (!emptyCheck.error && !tenantError) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, {tenantId, groupId})
      setGroupError(error)
      setGroupHelperText(msg)
      return error
    }
    return emptyCheck.error
  }
  const resourcesQuotaCheck = () => {
    const emptyCheck = checkEmpty("Resources Quota", resourcesQuota)
    setResourcesQuotaError(emptyCheck.error)
    setResourcesQuotaHelperText(emptyCheck.msg)
    return emptyCheck.error
  }
  const supporterCheck = () => {
    const emptyCheck = checkEmpty("Supporter", supporter)
    setSupporterError(emptyCheck.error)
    setSupporterHelperText(emptyCheck.msg)
    return emptyCheck.error
  }
  // 字段 tenant 检查
  useEffect(() => {
    tenantCheck()
    // eslint-disable-next-line
  }, [tenantId])
  // 字段 group 检查
  useEffect(() => {
    groupCheck()
    // eslint-disable-next-line
  }, [groupId])
  useEffect(() => {
    supporterCheck()
    // eslint-disable-next-line
  }, [supporter])
  useEffect(() => {
    resourcesQuotaCheck()
    // eslint-disable-next-line
  }, [resourcesQuota])
  return (
    <React.Fragment>
      <DetailPage
        breadcrumbsList = { breadcrumbsList }
        formTitle = 'Management Create'
        onFormFieldChange = { onFormFieldChange }
        onFormFieldBlur = { onFormFieldBlur }
        formFieldList = { formFieldList }
        showBtn ={ true }
        onBtnClick = { handelClick }
      />
    </React.Fragment>
  )
}

export default ManagemnetCreate
