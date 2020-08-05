import React, {useEffect, useState} from 'react';

import DetailPage from "../../../../components/DetailPage";
import roleApi from "../../../../api/role"
import {useParams} from "react-router-dom";
import dayjs from "dayjs";

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Role', path: '/aaa-service/role' },
  { title: 'Detail' },
]


function TenantDetail(props) {
  const { id } = useParams()
  const [label, setLabel] = React.useState('');
  const [value, setValue] = React.useState('');
  const [ createdAt, setCreatedAt ] = useState('');
  const [ updatedAt, setUpdastedAt ] = useState('');
  const [ formFieldList, setFormFieldList ] = useState([]);
  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }

  useEffect(() => {
    roleApi.detail(id).then(({ data }) => {
      if (data && data.data) {
        const { label, value, createdAt, updatedAt } = data.data;
        setLabel(label);
        setValue(value);
        setCreatedAt(createdAt);
        setUpdastedAt(updatedAt);
      }
    })
  }, [id])

  useEffect(() => {
    const list = [
      { id: 'label', label: 'Label', type: 'text', disabled: true, readOnly: true, value: label },
      { id: 'value', label: 'Value', type: 'text', disabled: true, readOnly: true, value: value },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list);
  },[label, value, createdAt, updatedAt]);
  const onFormFieldChange = (e, id) => {
    const { value } = e.target;
    switch(id) {
      case 'label':
        setLabel(value);
        break;
      case 'value':
        setValue(value);
        break;
      default:
        break;
    }
  }
  return (
    <React.Fragment>
      <DetailPage
        breadcrumbsList = { breadcrumbsList }
        formTitle = 'Role Detail'
        onFormFieldChange = { onFormFieldChange }
        formFieldList = { formFieldList }
      />
    </React.Fragment>
  );
}

export default TenantDetail;