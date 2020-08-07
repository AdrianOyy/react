import React, {useEffect, useState} from 'react';

import DetailPage from "../../../../components/DetailPage";
import managementApi from "../../../../api/management"
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import CommonTip from "../../../../components/CommonTip";
import { useHistory } from 'react-router-dom'
import {checkEmpty, getCheckExist} from "../untils/ManagementFieldCheck";
import tenantApi from "../../../../api/tenant";
import adGroupApi from "../../../../api/adGroup";

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Management', path: '/aaa-service/management' },
  { title: 'Update' },
]


function ManagementUpdate(props) {
  const { id } = useParams()
  const history = useHistory();
  const [ tenantId, setTenantId ] = React.useState('');
  const [ groupId, setGroupId ] = React.useState('');
  const [ supporter, setSupporter ] = useState('');
  const [ resourcesQuota, setResourcesQuota ] = useState('');
  const [ createdAt, setCreatedAt ] = useState('');
  const [ updatedAt, setUpdastedAt ] = useState('');
  const [ formFieldList, setFormFieldList ] = useState([]);
  const [ saving, setSaving ] = useState(true);
  const [ tenantError, setTenantError ] = useState(false);
  const [ groupError, setGroupError ] = useState(false);
  const [ tenantHelperText, setTenantHelperText ] = useState("");
  const [ groupHelperText, setGroupHelperText ] = useState("");
  const [ tenantList, setTenantList] = useState([]);
  const [ adGroupList, setAdGroupList] = useState([]);
  const [ supporterError, setSupporterError ] = useState(false);
  const [ supporterHelperText, setSupporterHelperText ] = useState("");
  const [ resourcesQuotaError, setResourcesQuotaError ] = useState(false);
  const [ resourcesQuotaHelperText, setResourcesQuotaHelperText ] = useState("");
  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }

  // 获取 tenantList 和 gourpList
  useEffect(() =>　{
    tenantApi.list({limit:999, page:1}).then(({data}) => {
      if (data && data.data) {
        const { rows } = data.data;
        setTenantList(rows)
      }
    })
    adGroupApi.list({limit:999, page: 1}).then(({data}) => {
      if (data && data.data) {
        const { rows } = data.data;
        setAdGroupList(rows)
      }
    })
  }, [])

  const tenantCheck = async () => {
    const emptyCheck = checkEmpty("Tenant", tenantId);
    setTenantError(emptyCheck.error)
    setTenantHelperText(emptyCheck.msg);
    if (!emptyCheck.error && !groupError) {
      const checkExist = getCheckExist();
      const { error, msg } = await checkExist(id, {tenantId, groupId})
      setTenantError(error);
      setTenantHelperText(msg);
      return error
    }
    return emptyCheck.error
  }
  const groupCheck = async () => {
    const emptyCheck = checkEmpty("AD Group", groupId);
    setGroupError(emptyCheck.error)
    setGroupHelperText(emptyCheck.msg);
    if (!emptyCheck.error && !tenantError) {
      const checkExist = getCheckExist();
      const { error, msg } = await checkExist(id, {tenantId, groupId})
      setGroupError(error);
      setGroupHelperText(msg);
      return error
    }
    return emptyCheck.error
  }

  const resourcesQuotaCheck = () => {
    const emptyCheck = checkEmpty("Resources Quota", resourcesQuota);
    setResourcesQuotaError(emptyCheck.error)
    setResourcesQuotaHelperText(emptyCheck.msg);
    return emptyCheck.error
  }

  const supporterCheck = () => {
    const emptyCheck = checkEmpty("Supporter", supporter);
    setSupporterError(emptyCheck.error)
    setSupporterHelperText(emptyCheck.msg);
    return emptyCheck.error
  }

  // 字段 tenant 检查
  useEffect(() => {
    tenantCheck();
    // eslint-disable-next-line
  }, [tenantId])
  // 字段 group 检查
  useEffect(() => {
    groupCheck();
    // eslint-disable-next-line
  }, [groupId])
  useEffect(() => {
    supporterCheck();
    // eslint-disable-next-line
  }, [supporter])
  useEffect(() =>{
    resourcesQuotaCheck();
    // eslint-disable-next-line
  }, [resourcesQuota])

  const hanleClick = async() => {
    const tenantError = await tenantCheck();
    const adGroupError = await groupCheck();
    const supporterError = supporterCheck();
    const resourcesQuotaError = resourcesQuotaCheck();
    if (tenantError || adGroupError || supporterError || resourcesQuotaError || saving) return;
    setSaving(true);
    managementApi.update(id, { tenantId, groupId, supporter, resourcesQuota })
      .then(() => {
        CommonTip.success("Success");
        history.push({pathname: '/aaa-service/management'})
      })
      .catch(() => {
        setSaving(false);
      })
  }

  useEffect(() => {
    managementApi.detail(id).then(({ data }) => {
      const { tenant, ad_group, supporter, resourcesQuota, createdAt, updatedAt } = data.data;
      setTenantId(tenant.id);
      setGroupId(ad_group.id);
      setSupporter(supporter);
      setResourcesQuota(resourcesQuota);
      setCreatedAt(createdAt);
      setUpdastedAt(updatedAt);
      setSaving(false);
    })
  }, [id])

  useEffect(() => {
    const list = [
      {
        id: 'tenant', label: 'Tenant', isSelector: true, required: true,
        readOnly: false, value: tenantId, error: tenantError, helperText: tenantHelperText,
        itemList: tenantList, labelField: "name", valueField: "id"
      },
      {
        id: 'group', label: 'AD Group', isSelector: true, required: true,
        readOnly: false, value: groupId, error: groupError, helperText: groupHelperText,
        itemList: adGroupList, labelField: "name", valueField: "id"
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
      },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list);
  },[tenantId, groupId, supporter, resourcesQuota, tenantError, groupError, supporterError, resourcesQuotaError, tenantHelperText, groupHelperText, supporterHelperText, resourcesQuotaHelperText, tenantList, adGroupList, createdAt, updatedAt ]);
  const onFormFieldChange = (e, id) => {
    const { value } = e.target;
    switch(id) {
      case 'tenant':
        setTenantId(value);
        break;
      case 'group':
        setGroupId(value);
        break;
      case 'supporter':
        setSupporter(value);
        break;
      case 'resourcesQuota':
        setResourcesQuota(value);
        break;
      default:
        break;
    }
  }
  const onFormFieldBlur = (id) => {
    switch(id) {
      case 'supporter':
        supporterCheck();
        break;
      case 'resourcesQuota':
        resourcesQuotaCheck();
        break;
      default:
        break;
    }
  }
  return (
    <React.Fragment>
      <DetailPage
        breadcrumbsList = { breadcrumbsList }
        formTitle = 'Management Update'
        onFormFieldChange = { onFormFieldChange }
        onFormFieldBlur = { onFormFieldBlur }
        formFieldList = { formFieldList }
        showBtn ={ true }
        onBtnClick = { hanleClick }
      />
    </React.Fragment>
  );
}

export default ManagementUpdate;
