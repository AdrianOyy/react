import React, {useEffect, useState} from 'react';

import DetailPage from "../../../../components/DetailPage";
import tenantGroupMappingApi from "../../../../api/tenantGroupMapping"
import CommonTip from "../../../../components/CommonTip";
import { useHistory } from 'react-router-dom'
import {checkEmpty, getCheckExist} from "../untils/TenantGroupMappingFieldCheck";
import tenantApi from "../../../../api/tenant";
import adGroupApi from "../../../../api/adGroup";

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Tenant AD Group Mapping', path: '/aaa-service/tenantAdGroupMapping' },
  { title: 'Create' },
]


function TenantGroupMappingCreate(props) {
  const history = useHistory();
  const [tenantId, setTenantId] = React.useState('');
  const [groupId, setGroupId] = React.useState('');
  const [ formFieldList, setFormFieldList ] = useState([]);
  const [ saving, setSaving ] = useState(false);
  const [ tenantError, setTenantError ] = useState(false);
  const [ groupError, setGroupError ] = useState(false);
  const [ tenantHelperText, setTenantHelperText ] = useState("");
  const [ groupHelperText, setGroupHelperText ] = useState("");
  const [tenantList, setTenantList] = useState([]);
  const [adGroupList, setAdGroupList] = useState([]);

  const handelClick = async() => {
    const tenantError = await tenantCheck();
    const adGroupError = await groupCheck();
    if (tenantError || adGroupError || saving) return;
    setSaving(true);
    tenantGroupMappingApi.create({ tenantId, groupId })
      .then(() => {
        CommonTip.success("Successfully Create");
        history.push({pathname: '/aaa-service/tenantAdGroupMapping'})
      })
      .catch(() => {
        setSaving(false);
      })
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
    ]
    setFormFieldList(list);
  },[
    tenantId,
    groupId,
    tenantList,
    adGroupList,
    tenantError,
    groupError,
    tenantHelperText,
    groupHelperText
  ]);
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
  const tenantCheck = async () => {
    const emptyCheck = checkEmpty("tenant", tenantId);
    setTenantError(emptyCheck.error)
    setTenantHelperText(emptyCheck.msg);
    if (!emptyCheck.error && !groupError) {
      const checkExist = getCheckExist();
      const { error, msg } = await checkExist(0, {tenantId, groupId})
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
      const { error, msg } = await checkExist(0, {tenantId, groupId})
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
  return (
    <React.Fragment>
      <DetailPage
        breadcrumbsList = { breadcrumbsList }
        formTitle = 'Tenant AD Group Mapping Create'
        onFormFieldChange = { onFormFieldChange }
        formFieldList = { formFieldList }
        showBtn ={ true }
        onBtnClick = { handelClick }
      />
    </React.Fragment>
  );
}

export default TenantGroupMappingCreate;