import React, {useEffect, useState} from 'react';

import DetailPage from "../../../../components/DetailPage";
import roleApi from "../../../../api/role"
import CommonTip from "../../../../components/CommonTip";
import { useHistory } from 'react-router-dom'
import {checkEmpty, getCheckExist} from "../untils/RoleFieldCheck";

const breadcrumbsList = [
  { title: 'AAA Service'},
  { title: 'Role', path: '/aaa-service/role' },
  { title: 'Create' },
]


function RoleCreate(props) {
  const history = useHistory();
  const [ label, setLabel ] = useState('');
  const [ value, setValue ] = useState('');
  const [ formFieldList, setFormFieldList ] = useState([]);
  const [ saving, setSaving ] = useState(false);
  const [ labelError, setLabelError ] = useState(false);
  const [ labelHelperText, setLabelHelperText ] = useState("");

  const handelClick = async() => {
    const labelError = await labelCheck();
    if (labelError || saving) return;
    setSaving(true);
    roleApi.create({ label, value })
      .then(() => {
        CommonTip.success("Successfully Create");
        history.push({pathname: '/aaa-service/role'})
      })
      .catch(() => {
        setSaving(false);
      })
  }
  useEffect(() => {
    const list = [
      { id: 'label', label: 'Label', type: 'text', required: true, readOnly: false, value: label, error: labelError, helperText: labelHelperText },
      { id: 'value', label: 'Value', isSelector: true, value, itemList: [
          { label: "Read Only", value: "Read Only" },
          { label: "Read & Write", value: "Read && Write" },
      ]},
    ]
    setFormFieldList(list);
  },[label, labelError, labelHelperText, value ]);
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
  const labelCheck = async () => {
    const emptyCheck = checkEmpty("label", label);
    setLabelError(emptyCheck.error)
    setLabelHelperText(emptyCheck.msg);
    if (!emptyCheck.error) {
      const checkExist = getCheckExist();
      const { error, msg } = await checkExist(0, label)
      setLabelError(error);
      setLabelHelperText(msg);
      return error
    }
    return emptyCheck.error
  }
  const onFormFieldBlur = (id) => {
    switch (id) {
      case "label":
        labelCheck();
        break;
      default:
        break;
    }
  }
  return (
    <React.Fragment>
      <DetailPage
        breadcrumbsList = { breadcrumbsList }
        formTitle = 'Role Create'
        onFormFieldChange = { onFormFieldChange }
        onFormFieldBlur = { onFormFieldBlur }
        formFieldList = { formFieldList }
        showBtn ={ true }
        onBtnClick = { handelClick }
      />
    </React.Fragment>
  );
}

export default RoleCreate;