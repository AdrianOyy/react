import React, {useEffect, useState} from 'react';

import DetailPage from "../../../../components/DetailPage";
import tenantApi from "../../../../api/tenant"
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import CommonTip from "../../../../components/CommonTip";
import { useHistory } from 'react-router-dom'
import {checkEmpty, getCheckExist} from "../untils/tenantFieldCheck";

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Tenant', path: '/aaa-service/tenant' },
  { title: 'Update' },
]


function TenantDetail(props) {
  const { id } = useParams()
  const history = useHistory();
  const [ name, setName ] = useState('');
  const [ createdAt, setCreatedAt ] = useState('');
  const [ updatedAt, setUpdastedAt ] = useState('');
  const [ formFieldList, setFormFieldList ] = useState([]);
  const [ saving, setSaving ] = useState(true);
  const [ nameError, setNameError ] = useState(false);
  const [ nameHelperText, setNameHelperText ] = useState("");
  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }

  const hanleClick = async() => {
    const nameErr = await nameCheck();
    if (nameErr || saving) return;
    setSaving(true);
    tenantApi.update(id, { name })
      .then(() => {
        CommonTip.success("Success");
        history.push({pathname: '/aaa-service/tenant'})
      })
      .catch(() => {
        setSaving(false);
      })
  }

  useEffect(() => {
    tenantApi.detail(id).then(({ data }) => {
      const { name, createdAt, updatedAt } = data.data;
      setName(name);
      setCreatedAt(createdAt);
      setUpdastedAt(updatedAt);
      setSaving(false);
    })
  }, [id])

  useEffect(() => {
    const list = [
      { id: 'name', label: 'Name', type: 'text', required: true, readOnly: false, value: name, error: nameError, helperText: nameHelperText },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list);
  },[name, createdAt, updatedAt, nameError, nameHelperText ]);
  const onFormFieldChange = (e, id) => {
    const { value } = e.target;
    switch(id) {
      case 'name':
        setName(value);
        break;
      default:
        break;
    }
  }
  const nameCheck = async () => {
    const emptyCheck = checkEmpty("name", name);
    setNameError(emptyCheck.error)
    setNameHelperText(emptyCheck.msg);
    if (!emptyCheck.error) {
      const checkExist = getCheckExist();
      const { error, msg } = await checkExist(id, name)
      setNameError(error);
      setNameHelperText(msg);
      return error
    }
    return emptyCheck.error
  }
  const onFormFieldBlur = (id) => {
    switch (id) {
      case "name":
        nameCheck();
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
        onFormFieldBlur = { onFormFieldBlur }
        formFieldList = { formFieldList }
        showBtn ={ true }
        onBtnClick = { hanleClick }
      />
    </React.Fragment>
  );
}

export default TenantDetail;
