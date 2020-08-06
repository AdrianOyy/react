import React, {useEffect, useState} from 'react';

import DetailPage from "../../../../components/DetailPage";
import tenantGroupMappingApi from "../../../../api/tenantGroupMapping"
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import CommonTip from "../../../../components/CommonTip";
import { useHistory } from 'react-router-dom'
import {checkEmpty, getCheckExist} from "../untils/TenantGroupMappingFieldCheck";
import tenantApi from "../../../../api/tenant";
import adGroupApi from "../../../../api/adGroup";

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Tenant AD Group Mapping', path: '/aaa-service/tenantAdGroupMapping' },
  { title: 'Update' },
]


function TenantDetail(props) {
  const { id } = useParams()
  const history = useHistory();
  const [tenantId, setTenantId] = React.useState('');
  const [groupId, setGroupId] = React.useState('');
  const [ createdAt, setCreatedAt ] = useState('');
  const [ updatedAt, setUpdastedAt ] = useState('');
  const [ formFieldList, setFormFieldList ] = useState([]);
  const [ saving, setSaving ] = useState(true);
  const [ tenantError, setTenantError ] = useState(false);
  const [ groupError, setGroupError ] = useState(false);
  const [ tenantHelperText, setTenantHelperText ] = useState("");
  const [ groupHelperText, setGroupHelperText ] = useState("");
  const [tenantList, setTenantList] = useState([]);
  const [adGroupList, setAdGroupList] = useState([]);
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
    const emptyCheck = checkEmpty("tenant", tenantId);
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

  const hanleClick = async() => {
    const tenantError = await tenantCheck();
    const adGroupError = await groupCheck();
    if (tenantError || adGroupError || saving) return;
    setSaving(true);
    tenantGroupMappingApi.update(id, { tenantId, groupId })
      .then(() => {
        CommonTip.success("Successfully Update");
        history.push({pathname: '/aaa-service/tenantAdGroupMapping'})
      })
      .catch(() => {
        setSaving(false);
      })
  }

  useEffect(() => {
    tenantGroupMappingApi.detail(id).then(({ data }) => {
      const { tenant, ad_group, createdAt, updatedAt } = data.data;
      setTenantId(tenant.id);
      setGroupId(ad_group.id);
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
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list);
  },[tenantId, groupId, tenantError, groupError, tenantHelperText, groupHelperText, tenantList, adGroupList, createdAt, updatedAt ]);
  const onFormFieldChange = (e, id) => {
    const { value } = e.target;
    switch(id) {
      case 'tenant':
        setTenantId(value);
        break;
      case 'group':
        setGroupId(value);
        break;
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        breadcrumbsList = { breadcrumbsList }
        formTitle = 'Tenant Update'
        onFormFieldChange = { onFormFieldChange }
        formFieldList = { formFieldList }
        showBtn ={ true }
        onBtnClick = { hanleClick }
      />
    </React.Fragment>
  );
}

export default TenantDetail;