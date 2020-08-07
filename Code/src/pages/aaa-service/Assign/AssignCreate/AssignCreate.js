import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import DetailPage from "../../../../components/DetailPage";
import assignApi from "../../../../api/assign"
import CommonTip from "../../../../components/CommonTip";
import {checkEmpty, getCheckExist} from "../untils/assignFieldCheck";
import tenantGroupMappingApi from "../../../../api/tenantGroupMapping";
import roleApi from "../../../../api/role"

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Assign', path: '/aaa-service/assign' },
  { title: 'Create' },
]

function AssignCreate(props) {
  const history = useHistory();
  const [mappingId, setMappingId] = useState('');
  const [roleId, setRoleId] = useState('');
  const [ formFieldList, setFormFieldList ] = useState([]);
  const [ saving, setSaving ] = useState(false);
  const [ mappingError, setMappingError ] = useState(false);
  const [ mappingHelperText, setMappingHelperText ] = useState("");
  const [ mappingList, setMappingtList] = useState([]);
  const [ roleError, setRoleError ] = useState(false);
  const [ roleHelperText, setRoleHelperText ] = useState("");
  const [ roleList, setRoleList ] = useState([]);

  const handelClick = async() => {
    const mappingError = await mappingCheck();
    const roleError = await roleCheck();
    if (mappingError || roleError || saving) return;
    setSaving(true);
    assignApi.create({ mappingId, roleId })
      .then(() => {
        CommonTip.success("Successfully Create");
        history.push({pathname: '/aaa-service/assign'})
      })
      .catch(() => {
        setSaving(false);
      })
  }
  // 获取 mappingList 和 roleList
  useEffect(() =>　{
    tenantGroupMappingApi.handledList().then(({data}) => {
      if (data) {
        setMappingtList(data.data)
      }
    })
    roleApi.list({limit:999, page: 1}).then(({data}) => {
      if (data && data.data) {

        const { rows } = data.data;
        setRoleList(rows)
      }
    })

  }, [])
  useEffect(() => {
    const list = [
      {
        id: 'mapping', label: 'Tenant + Group', isSelector: true, value: mappingId,
        itemList: mappingList, labelField: 'name', valueField: 'id',
        error: mappingError, helperText: mappingHelperText,
      },
      {
        id: 'role', label: 'Role', isSelector: true, value: roleId,
        itemList: roleList, labelField: 'label', valueField: 'id',
        error: roleError, helperText: roleHelperText,
      },
    ]
    setFormFieldList(list);
  },[
    mappingId,
    roleId,
    mappingList,
    roleList,
    mappingError,
    roleError,
    mappingHelperText,
    roleHelperText
  ]);
  const onFormFieldChange = (e, id) => {
    const { value } = e.target;
    switch(id) {
      case 'mapping':
        setMappingId(value);
        break;
      case 'role':
        setRoleId(value);
        break;
      default:
        break;
    }
  }
  const mappingCheck = async () => {
    const emptyCheck = checkEmpty("mapping", mappingId);
    setMappingError(emptyCheck.error)
    setMappingHelperText(emptyCheck.msg);
    if (!emptyCheck.error) {
      const checkExist = getCheckExist();
      const { error, msg } = await checkExist(0, {mappingId})
      setMappingError(error);
      setMappingHelperText(msg);
      return error
    }
    return emptyCheck.error
  }
  const roleCheck = async () => {
    const emptyCheck = checkEmpty("role", roleId);
    setRoleError(emptyCheck.error)
    setRoleHelperText(emptyCheck.msg);
    return emptyCheck.error
  }
  // 字段 tenant 检查
  useEffect(() => {
    mappingCheck();
    // eslint-disable-next-line
  }, [mappingId])
  // 字段 group 检查
  useEffect(() => {
    roleCheck();
    // eslint-disable-next-line
  }, [roleId])
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

export default AssignCreate;