import React, { useState, useEffect, useRef } from "react"
import Api from "../../api/dynamicForm"
import workflowApi from "../../api/workFlow"
import DIYForm from "../../components/DIYForm"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Paper as HAPaper } from "@material-ui/core"
import ChildForm from "../../components/ChildForm"
import getLogic from "../../utils/dynamicFormLogic"
import { map2object } from "../../utils/map2object"
import HATable from "../../components/HATable"
import Loading from "../../components/Loading"
import { lang } from "../../lang/lang"
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import {
  BorderColorOutlined as BorderColorIcon,
} from "@material-ui/icons"
import {
  Button as HAButton,
  ButtonGroup,
} from '@material-ui/core'
import API from '../../api/diyForm'
import CommonTip from "../CommonTip"

import { useHistory } from "react-router-dom"

const Paper = withStyles(() => ({
  root: {
    padding: '4vh 2vw 2vh 2vw',
    minHeight: '60vh',
    maxWidth: '75vw',
  },
}))(HAPaper)

const Button = withStyles((() => ({
  root: {
    width: '5vw',
  }
})))(HAButton)

const useStyles = makeStyles(() => ({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '14vh'
  },
  button: {
    marginLeft: '1vw',
    marginRight: '1vw',
  }
}))


export default function CommonWorkflowForm(props) {
  const {
    processDefinitionId,
    pid,
    deploymentId,
    stepName,
    pageName,
    taskId,
  } = props
  const history = useHistory()
  const container = useRef(null)
  const classes = useStyles()
  // 业务逻辑
  const [ logic, setLogic ] = useState({})
  // 流程名称
  const [ workflowName, setWorkflowName ] = useState('')
  // 父表渲染表
  const [ parentFormDetail, setParentFormDetail ] = useState([])
  // 子表渲染表
  const [ childFormDetail, setChildFormDetail ] = useState([])
  // VM list
  const [ childDataList, setChildDataList ] = useState([])
  // 子表表头字段
  const [ tableHeader, setTableHeader ] = useState([])
  // 子表 body 字段
  const [ fieldList, setFieldList ] = useState([])
  // 子表打开标识
  const [ open, setOpen ] = useState(false)
  // 子表初始数据
  const [ childDefaultValues, setChildDefaultValues ] = useState({})
  // 父表初始数据
  const [ parentDefaultValues, setParentDefaultValues ] = useState({})

  const [ formKey, setFormKey ] = useState('')

  const [ childFormKey, setChildFormKey ] = useState('')

  const [ version, setVersion ] = useState('')

  const [ create, setCreate ] = useState(false)

  const [ current, setCurrent ] = useState(-1)

  const [ checkCount, setCheckCount ] = useState(0)

  const [ formId, setFormId ] = useState(0)

  const [ isNew, setIsNew ] = useState(false)

  const [ parentDataMap ] = useState(new Map())
  // 原始渲染数据
  const [ rawData, setRawData ] = useState(null)
  // 原始数据
  const [ rawDefaultData, setRawDefaultData ] = useState(null)
  // 子表渲染数据 Map
  const childDataMap = new Map()
  const childDataListMap = new Map()
  const [ shown, setShown ] = useState(false)

  const ex_us = lang.ex_us

  // 获取原始渲染数据、流程实例数据
  useEffect(() => {
    // 获取渲染表
    Api.getDynamicForm({ deploymentId })
      .then(({ data }) => {
        const {
          workflowName, parentFormDetail,
          childFormDetail, formKey, childFormKey, version
        } = data.data
        setFormKey(formKey)
        setVersion(version)
        setChildFormKey(childFormKey)
        setWorkflowName(workflowName)
        setRawData({
          parentFormDetail,
          childFormDetail
        })
        // 获取数据表
        if (!pid) return
        API.detail({ pid, deploymentId })
          .then(({ data }) => {
            setCreate(true)
            const { parentData, childDataList } = data.data
            console.log(data.data)
            setRawDefaultData({
              parentData,
              childDataList
            })
          })
      })
  }, [ deploymentId, pid ])

  // 获取业务逻辑
  useEffect(() => {
    setLogic(getLogic(workflowName))
  }, [ workflowName ])

  // 处理原始渲染数据和具体数据
  useEffect(() => {
    if (!logic || !rawData) return
    const { parentFormDetail, childFormDetail } = rawData
    // 处理父表渲染表
    const parentDetail = logic.handleParentData(parentFormDetail, stepName, pageName)
    setParentFormDetail(parentDetail)

    // 处理子表渲染表
    if (childFormDetail && childFormDetail.length > 0) {
      const childDetail = logic.handleChildData(childFormDetail, stepName, pageName)
      if (childDetail && childDetail.length > 0) {
        setChildFormDetail(childDetail)
        childDetail.forEach(el => {
          childDataListMap.set(el.fieldName, {
            type: el.inputType,
            fieldName: el.fieldName,
            fieldDisplayName: el.fieldDisplayName,
            itemList: el.itemList,
            labelField: el.labelField,
            valueField: el.valueField
          })
        })
      }

      console.log('==============================1')
      // 获取表头
      const headerList = logic.getHeaderList(childDataListMap, stepName, pageName)
      headerList.push({
        id: 'action',
        alignment: 'right',
        label: 'Actions',
      })
      setTableHeader(headerList)

      // 获取表格每行显示字段
      const fieldList = logic.getFieldList(childDataListMap, stepName, pageName)
      setFieldList(fieldList)
    }
    // 处理数据
    if (!rawDefaultData) return
    const { parentData, childDataList } = rawDefaultData
    setFormId(parentData.id)
    const handledParentData = logic.handleParentDefaultData(parentData, stepName)
    setParentDefaultValues(handledParentData)
    if (childFormDetail.length > 0) {
      const handledChildData = logic.handleChildDefaultData(childDataList, childDataListMap)
      setChildDataList(handledChildData)
    }
    // eslint-disable-next-line
  }, [logic, rawData, rawDefaultData])

  // 打开子表
  const openChildForm = () => {
    setOpen(true)
  }

  // 子表关闭
  const handleClose = () => {
    setOpen(false)
    setIsNew(false)
    setCurrent(-1)
    setChildDefaultValues({})
    setParentDefaultValues(map2object(parentDataMap))
  }

  // 子表保存
  const handleSave = async () => {
    const pass = logic.checkChildForm && await logic.checkChildForm(childDataMap)
    if (pass) {
      const childData = map2object(childDataMap)
      if (current < 0) {
        childDataList.push(childData)
      } else {
        childData.id = childDataList[current].id
        childDataList[current] = childData
      }
      handleClose()
    }
  }

  // 父表改动
  const onParentChange = (data) => (logic.onFieldChange(data, parentDataMap, container))

  // 子表改动
  const onChildChange = (data) => (logic.onFieldChange(data, childDataMap, container))

  // 打开新表
  const openNewDialog = () => {
    setIsNew(true)
    openChildForm()
  }

  // 打开详情表
  const handleDetail = (e, index) => {
    setCurrent(index)
    setChildDefaultValues(childDataList[index])
    openChildForm()
  }

  const handleCheck = async () => {
    // await handleSave()
    const childData = map2object(childDataMap)
    childData.id = childDataList[current].id
    childData.checkState = false
    const form = {
      formId,
      formKey,
      version,
      childDataList: childData
    }
    Loading.show()
    API.check(form)
      .then(({ data }) => {
        Loading.hide()
        if (data) {
          const fileList = data.data
          let isError = false
          for (const item of fileList) {
            if (item.error) {
              isError = true
              CommonTip.error(item.message)
              break
            }
          }
          if (!isError) {
            childData.checkState = true
            setCheckCount(checkCount + 1)
            childDataList[current] = childData
            CommonTip.success('Check successfully')
            handleClose()
          }
        }
      })
      .catch(() => {
        Loading.hide()
      })
    // console.log()
    // setCheckCount(checkCount + 1)
    // console.log('check')
  }

  const handleCancel = () => {
    history.push({ pathname: `/MyRequest` })
  }

  // 提交表单
  const handleSubmit = async () => {
    // 验证父表
    const pass = logic.checkForm && await logic.checkForm(parentFormDetail, parentDataMap)
    if (pass) {
      const form = {
        processDefinitionId,
        formKey,
        childFormKey,
        parentData: map2object(parentDataMap),
        childDataList,
        version
      }
      if (processDefinitionId) {
        API.create(form)
          .then(() => {
            CommonTip.success('Success')
            history.push('/')
          })
      } else {
        const formUpdate = {
          pid,
          formKey,
          childFormKey,
          taskId,
          version,
          parentData: map2object(parentDataMap),
          childDataList,
        }
        if (stepName === 'T3') {
          let ischeck = true
          for (const child of childDataList) {
            console.log(child)
            if (!child.checkState) {
              ischeck = false
              CommonTip.error('please check vm list')
              break
            }
          }
          if (ischeck) {
            API.update(formUpdate).then(() => {
              CommonTip.success('Success')
              history.push({ pathname: `/MyApproval` })
            })
          }
        } else {
          API.update(formUpdate).then(() => {
            CommonTip.success('Success')
            history.push({ pathname: `/MyApproval` })
          })
        }
      }
    }
  }
  const dialogReason = {
    title: ex_us['RejectReason'] || 'Reject Reason',
    value: '',
    formField:
    {
      id: 'reason', label: ex_us['Reason'] || 'Reason', type: 'text', disabled: false, readOnly: false, required: true, helperText: ex_us['NotEmpty'] || 'Not Allow Empty'
    },
    onSubmit: (value) => {
      if (!value) return
      const data = {
        taskId,
        variables: { pass: false },
        rejectReason: value
      }
      rejectActions(data)
    },
  }
  const handleReasonSubmit = () => {
    if (dialogReason.value && dialogReason.value.length > 0) {
      let data = {
        taskId,
        variables: { leaderCheck: false },
        reason: dialogReason.value
      }
      rejectActions(data)
    }
  }
  const handleReasonChange = (event, id) => {
    dialogReason.value = event.target.value
  }
  const rejectActions = (data) => {
    workflowApi.actionTask(data)
      .then(() => {
        setShown(false)
        CommonTip.success('Success')
        history.push({ pathname: `/MyApproval` })
      })
  }

  const handleAgrreTaskClick = () => {
    const agreeModel = {
      taskId,
      variables: { pass: true },
    }
    workflowApi.actionTask(agreeModel)
      .then(({ data }) => {
        if (data.status === 400) {
          CommonTip.error(data.data)
        } else {
          CommonTip.success(ex_us['Success'] || 'Success')
          history.push({ pathname: `/MyApproval` })
        }
      })
  }

  // 子表行内按钮列表
  const actionList = [
    { label: 'Detail', icon: <BorderColorIcon />, onClick: handleDetail },
  ]

  // 子表按钮
  const buttonList = [
    { id: 'save', label: 'Save', color: 'primary', onClick: handleSave, disabled: stepName === 'teamManager' },
    { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClose, disabled: false },
  ]

  const handleT1FollowUpClick = () => {
    const childData = map2object(childDataMap)
    console.log(childData)
    childData.status.value = 'skip'
    childData.checkState = true
    childData.id = childDataList[current].id
    childDataList[current] = childData
    handleClose()
    CommonTip.success('T1 Follow Up Success')
  }
  const handleT2FollowUpClick = () => {
    const childData = map2object(childDataMap)
    childData.status.value = 'skip'
    childData.checkState = true
    childData.id = childDataList[current].id
    childDataList[current] = childData
    handleClose()
    CommonTip.success('T2 Follow Up Success')
  }
  const handleT6FollowUpClick = () => {
    const childData = map2object(childDataMap)
    childData.status.value = 'skip'
    childData.checkState = true
    childData.id = childDataList[current].id
    childDataList[current] = childData
    handleClose()
    CommonTip.success('T6 Follow Up Success')
  }


  const t3buttonList = [
    // { id: 'save', label: 'Save', color: 'primary', onClick: handleSave, disabled: false },
    { id: 'check', label: 'Check', color: 'primary', onClick: handleCheck, disabled: false },
    { id: 'T1', label: 'T1', color: 'secondary', onClick: handleT1FollowUpClick, disabled: false },
    { id: 'T2', label: 'T2', color: 'secondary', onClick: handleT2FollowUpClick, disabled: false },
    { id: 'T6', label: 'T6', color: 'secondary', onClick: handleT6FollowUpClick, disabled: false },
    { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClose, disabled: false },
  ]

  return (
    <React.Fragment>
      <Paper ref={container}>
        <DIYForm
          pid={pid}
          htmlId={'DynamicParentForm'}
          dataList={parentFormDetail}
          formTitle={workflowName}
          onChange={onParentChange}
          defaultValues={parentDefaultValues}
        />
        {
          (childFormDetail.length > 0) ? (
            <React.Fragment>
              <HATable
                id={'DynamicTable'}
                rows={childDataList}
                hideCreate={create}
                actionList={actionList}
                tableName={logic.getChildTableTitle && logic.getChildTableTitle()}
                headCells={tableHeader}
                fieldList={fieldList}
                addChild={openNewDialog}
                marginTop={8}
              />
              <ChildForm
                id={'DynamicDialog'}
                pid={pid}
                open={open}
                formDetail={childFormDetail}
                defaultValues={childDefaultValues}
                onChange={onChildChange}
                childFormTitle={logic.getChildFormTitle && logic.getChildFormTitle()}
                buttonList={stepName === 'T3' ? t3buttonList : buttonList}
                isNew={isNew}
              /></React.Fragment>
          ) : ''
        }
        {/* <DialogText*/}
        {/* title={'Remark'}*/}
        {/* detail={'Please Input Remark'}*/}
        {/* label={'Remark'}*/}
        {/* open={diaLogOpen}*/}
        {/* handleSubmit={'Remark'}*/}
        {/* handleClose={'Remark'}*/}
        {/* />*/}
        <ButtonGroup className={classes.buttonGroup}>
          {
            (!pid || stepName === 'T3') ? (
              <Button
                className={classes.button}
                variant="contained"
                color='primary'
                onClick={handleSubmit}
              >
                Submit
              </Button>
            ) : (
              (stepName === 'detail') ?
                (
                  <Button
                    className={classes.button}
                    variant="contained"
                    color='primary'
                    onClick={handleCancel}
                  >
                      Cancel
                  </Button>
                ) :
                (
                  <div>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color='primary'
                      onClick={handleAgrreTaskClick}
                    >
                        Approval
                    </Button>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color='primary'
                      onClick={() => { setShown(true) }}
                    >Reject
                    </Button>
                  </div>
                )
            )
          }
        </ButtonGroup>

      </Paper>

      <Dialog
        open={shown}
        fullWidth={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogReason.title}</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <TextField
              fullWidth={true}
              id={dialogReason.formField.id.toString()}
              key={dialogReason.formField.id + dialogReason.formField.label}
              label={dialogReason.formField.label}
              type={dialogReason.formField.type}
              error={dialogReason.formField.error || false}
              helperText={dialogReason.formField.helperText || ''}
              disabled={dialogReason.formField.disabled || false}
              required={dialogReason.formField.required || false}
              onChange={!dialogReason.formField.readOnly ? (event) => handleReasonChange(event, dialogReason.formFieldId) : null}
              value={dialogReason.formField.value}
              multiline
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            fullwidth
            onClick={() => { setShown(false) }}>{ex_us['Cancel'] || 'Cancel'}</Button>
          <Button
            fullwidth
            variant="contained"
            color="primary"
            style={{ marginRight: '2ch' }}
            onClick={handleReasonSubmit}>{ex_us['Submit'] || 'Submit'}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

