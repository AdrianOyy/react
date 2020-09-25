import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  ButtonGroup, Button,
} from "@material-ui/core"

import SettingBar from '../../../../../components/SettingBar'
import { CommonTable } from '../../../../../components'
import { makeStyles } from '@material-ui/core/styles'
import SettingForm from '../../../../../components/SettingForm'
import { map2object, map2Label, map2Values } from "../../../../../utils/map2object"
import getLogic from "../../../../../utils/dynamicFormLogic"
import API from "../../../../../api/dynamicForm"
import {
  BorderColorOutlined as BorderColorIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons"
import { useLocation, useParams } from "react-router-dom"
import path from "../../../../../utils/path"
import deepClone from "../../../../../utils/deepClone"
import CommonTip from "../../../../../components/CommonTip"

const useStyles = makeStyles(() => ({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '14vh'
  },
  button: {
    marginLeft: '1vw',
    marginRight: '1vw',
  },
  div: {
    display: "none"
  }
}))

export default function MaterialTableDemo() {
  const { id } = useParams()
  const history = useHistory()
  const arr = path.getQueryString(useLocation().search)
  const name = decodeURI(arr['name'])
  const [ parentFormKey, setParentFormKey ] = useState(null)
  const [ selectChild, setSelectChild ] = useState(false)
  const [ childFormKey, setChildFormKey ] = useState(null)
  const [ open, setOpen ] = useState(false)
  const [ isNew, setIsNew ] = useState(false)
  const [ parentRows, setParentRows ] = useState([])
  const [ barfieldList, setBarfieldList ] = useState([])
  const [ childRows, setChildRows ] = useState([])
  const [ childVersion, setChildVersion ] = useState(1)
  const [ parentValues, setParentValues ] = useState([])
  const [ childValues, setChildValues ] = useState([])
  const [ current, setCurrent ] = useState(-1)
  const [ showTable, setShowTable ] = useState(false)
  const [ type, setType ] = useState(null)
  const [ childFormDetail, setChildFormDetail ] = useState(null)
  const [ childDefaultValues, setChildDefaultValues ] = useState({})
  const childDataMap = new Map()

  const classes = useStyles()
  const handleFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "parentFormKey":
        setParentFormKey(value)
        break
      case "selectChild":
        setSelectChild(value)
        break
      case "childFormKey":
        setChildFormKey(value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    API.workFlowDetail({ modelId: id })
      .then(({ data }) => {
        const result = data.data
        if (result.dynamicForm) {
          setChildVersion(parseInt(result.dynamicForm.childVersion) + 1)
          setParentFormKey(result.dynamicForm.formKey)
          const parentLabels =  map2Label(result.parentTableList)
          setParentRows(parentLabels)
          const pValues = map2Values(parentLabels)
          setParentValues(pValues)
          if (result.childDynamicForm) {
            setSelectChild(true)
            setChildFormKey(result.childDynamicForm.formKey)
            // setChildRows(result.childTableList)
            const childLabels =  map2Label(result.childTableList)
            setChildRows(childLabels)
            const cValues = map2Values(childLabels)
            setChildValues(cValues)
          }
        }
      })
  }, [ id ])

  useEffect(() => {
    const searchBarFieldList = [
      { id: 'parentFormKey', label: 'Parent Form Key', type: 'text', disabled: false, readOnly: false, value: parentFormKey },
      { id: 'selectChild', label: 'Select Child', type: 'boolean', disabled: false, readOnly: false, value: selectChild },
      { id: 'childFormKey', label: 'Child Form Key', type: 'text', disabled: !selectChild, readOnly: false, value: childFormKey },
    ]
    setBarfieldList(searchBarFieldList)
  }, [ parentFormKey, selectChild, childFormKey ])

  useEffect(() => {
    const detail = [
      { fieldDisplayName: "Field Name", fieldName: "fieldName", type: "text", valueField: null, labelField: null, required: true, showRequest: true },
      { fieldDisplayName: "Field Display Name", fieldName: "fieldDisplayName", type: "text", valueField: null, labelField: null, showRequest: true, required: true },
      {
        fieldDisplayName: "Field Type", fieldName: "fieldType", type: "select", valueField: 'id', labelField: 'value', showRequest: true, required: false,
        itemList: [{ id: 'string', value: 'string' }, { id: 'int', value: 'int' }, { id: 'date', value: 'date' }]
      },
      {
        fieldDisplayName: "Input Type", fieldName: "inputType", type: "select", valueField: 'id', labelField: 'value', showRequest: true, required: false,
        itemList: [{ id: 'text', value: 'text' }, { id: 'select', value: 'select' }, { id: 'date', value: 'date' }]
      },
      {
        fieldDisplayName: "Show On Request", fieldName: "showOnRequest", type: "select", valueField: 'id', labelField: 'value', required: false, showRequest: true,
        itemList: [{ id: '1', value: 'True' }, { id: '0', value: 'False' }]
      },
      { fieldDisplayName: "Required", fieldName: "required", type: "select", valueField: 'id', labelField: 'value', required: false, showRequest: true, itemList: [{ id: '1', value: 'True' }, { id: '0', value: 'False' }] },
      { fieldDisplayName: "Readable", fieldName: "readable", type: "select", valueField: 'id', labelField: 'value', required: false, showRequest: true, itemList: [{ id: '1', value: 'True' }, { id: '0', value: 'False' }] },
      { fieldDisplayName: "Writable", fieldName: "writable", type: "select", valueField: 'id', labelField: 'value', required: false, showRequest: true, itemList: [{ id: '1', value: 'True' }, { id: '0', value: 'False' }] },
      { fieldDisplayName: "Foreign Table", fieldName: "foreignTable", type: "text", valueField: null, labelField: null, required: false, showRequest: false },
      { fieldDisplayName: "Foreign Key", fieldName: "foreignKey", type: "text", valueField: null, labelField: null, required: false, showRequest: false },
      { fieldDisplayName: "Foreign Display Key", fieldName: "foreignDisplayKey", type: "text", valueField: null, labelField: null, required: false, showRequest: false },
    ]
    setChildFormDetail(detail)
  }, [ showTable ])

  // 表头字段列表
  const headCells = [
    { id: 'fieldName', alignment: 'center', label: 'Field Name' },
    { id: 'fieldDisplayName', alignment: 'center', label: 'Field Display Name' },
    { id: 'fieldType', alignment: 'center', label: 'Field Type' },
    { id: 'showOnRequest', alignment: 'center', label: 'Show On Request' },
    { id: 'action', alignment: 'right', label: 'Action' },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'fieldName', align: 'center' },
    { field: 'fieldDisplayName', align: 'center' },
    { field: 'fieldType', align: 'center' },
    { field: 'showOnRequest', align: 'center' },
  ]

  const handleClose = () => {
    setChildDefaultValues({})
    setOpen(false)
  }

  const onChildChange = (data) => {
    getLogic('WorkflowSetting').onFieldChange(data, childDataMap)
  }

  const handleSave = async () => {
    const childData = map2object(childDataMap)
    const data = {}
    for (const child in childData) {
      data[child] = childData[child].label
    }
    if (current === -1) {
      if (type === 'child') {
        childValues.push(childData)
        childRows.push(data)
      } else {
        parentValues.push(childData)
        parentRows.push(data)
      }
    } else {
      if (type === 'child') {
        childValues[current] = childData
        childRows[current] = data
      } else {
        parentValues[current] = childData
        parentRows[current] = data
      }
    }
    setChildDefaultValues({})
    setIsNew(false)
    setOpen(false)
  }

  const customCreate = () => {
    setType('parent')
    setCurrent(-1)
    setIsNew(true)
    setOpen(true)
  }

  const customChildCreate = () => {
    setType('child')
    setCurrent(-1)
    setIsNew(true)
    setOpen(true)
  }

  const handleDetail = (e, row, index) => {
    setType('parent')
    setCurrent(index)
    setChildDefaultValues(parentValues[index])
    setOpen(true)
  }

  const handleDelete = (e, row, index) =>  {
    const values = deepClone(parentValues)
    values.splice(index, 1)
    setParentValues(values)
    parentRows.splice(index, 1)
  }

  const handleChildDelete = (e, row, index) =>  {
    const values = deepClone(childValues)
    values.splice(index, 1)
    setChildValues(values)
    childRows.splice(index, 1)
  }

  const handleChildDetail = (e, row, index) => {
    setType('child')
    setCurrent(index)
    setChildDefaultValues(childValues[index])
    setOpen(true)
  }

  // 子表行内按钮列表
  const actionList = [
    { label: 'delete', icon: <DeleteIcon />, handleClick: handleDelete },
    { label: 'Detail', icon: <BorderColorIcon />, handleClick: handleDetail },
  ]

  const actionChildList = [
    { label: 'delete', icon: <DeleteIcon />, handleClick: handleChildDelete },
    { label: 'Detail', icon: <BorderColorIcon />, handleClick: handleChildDetail },
  ]

  const buttonList = [
    { id: 'submit', label: 'Submit', color: 'default', onClick: handleSave, disabled: false },
    { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClose, disabled: false },
  ]

  const handleSubmit = () => {
    const form = {
      modelId: id,
      workflowName: name,
      parentFormKey,
      parentValues,
      childVersion,
      selectChild,
      childValues,
      childFormKey,
    }
    console.log(form)
    API.createWorkFlow(form).then(({ data }) => {
      if (data) {
        CommonTip.success("Success")
        handleCancle()
      }
    })
  }

  const handleCancle = () => {
    history.push({ pathname: '/workflow/workflowSetting' })
  }

  return (
    <div>
      <SettingBar
        onSearchFieldChange={handleFieldChange}
        fieldList = {barfieldList}
      />
      <CommonTable
        rows={parentRows}
        tableName={'Parent Form List'}
        headCells={headCells}
        fieldList={fieldList}
        hideUpdate={true}
        hideDetail={true}
        hideCheckBox={true}
        customCreate={customCreate}
        actionList={actionList}
      />
      <SettingForm
        id={'DynamicDialog'}
        open={open}
        formDetail={childFormDetail}
        defaultValues={childDefaultValues}
        onChange={onChildChange}
        childFormTitle={'Detail'}
        buttonList={buttonList}
        isNew={isNew}
      />
      <div className={!selectChild ? classes.div : null}>
        <CommonTable
          rows={childRows}
          tableName={'Child Form List'}
          headCells={headCells}
          fieldList={fieldList}
          hideUpdate={true}
          hideDetail={true}
          hideCheckBox={true}
          customCreate={customChildCreate}
          actionList={actionChildList}
        />
      </div>
      <ButtonGroup className={classes.buttonGroup}>
        <Button  variant="contained" className={classes.button} onClick={handleSubmit} color='primary'>Submit</Button>
        <Button  variant="contained" className={classes.button} onClick={handleCancle} >Cancle</Button>
      </ButtonGroup>
    </div>
  )
}
