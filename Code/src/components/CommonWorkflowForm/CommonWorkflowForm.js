import React, { useState, useEffect, useRef } from "react"
import Api from "../../api/dynamicForm"
import DIYForm from "../../components/DIYForm"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Paper as HAPaper } from "@material-ui/core"
import ChildForm from "../../components/ChildForm"
import getLogic from "../../utils/dynamicFormLogic"
import map2object from "../../utils/map2object"
import HATable from "../../components/HATable"
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


function CommonWorkflowForm(props) {
  const {
    processDefinitionId,
    pid,
    deploymentId,
    tableHeaderLength,
  } = props
  const history = useHistory()
  const container = useRef(null)
  const classes = useStyles()
  const [ logic, setLogic ] = useState({})
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

  const [ current, setCurrent ] = useState(-1)

  const parentDataMap = new Map()
  const childDataMap = new Map()

  // 获取渲染表
  useEffect(() => {
    Api.getDynamicForm({ deploymentId })
      .then(({ data }) => {
        const {
          workflowName, parentFormDetail, parentData,
          childFormDetail, childDataList, formKey, childFormKey,
        } = data.data
        setFormKey(formKey)
        setChildFormKey(childFormKey)
        setWorkflowName(workflowName)
        setChildDataList(childDataList ? childDataList : [])
        setParentDefaultValues(parentData)
        setParentFormDetail(parentFormDetail)
        if (childFormDetail && childFormDetail.length > 0) {
          setChildFormDetail(childFormDetail)
          // 设置表头
          const headerList = []
          const fileList = []
          for (let i = 0; i < childFormDetail.length; i++) {
            if (headerList.length >= (tableHeaderLength ? tableHeaderLength : 5)) break
            if (childFormDetail[i].showOnRequest) {
              headerList.push({
                id: childFormDetail[i].fieldName,
                alignment: 'center',
                label: childFormDetail[i].fieldDisplayName,
              })
              fileList.push({
                field: childFormDetail[i].fieldName,
                align: 'center',
              })
            }
          }
          headerList.push({
            id: 'action',
            alignment: 'right',
            label: 'Actions',
          })
          setTableHeader(headerList)
          setFieldList(fileList)
        }
      })
  }, [])

  // 获取业务逻辑
  useEffect(() => {
    setLogic(getLogic(workflowName))
  }, [ workflowName ])

  // 打开子表
  const openChildForm = () => {
    setOpen(true)
  }

  // 子表关闭
  const handleClose = () => {
    setOpen(false)
    setCurrent(-1)
    setChildDefaultValues({})
  }

  // 子表保存
  const handleSave = async () => {
    const pass = logic.checkDialog && await logic.checkChildForm(childDataMap)
    if (pass) {
      const childData = map2object(childDataMap)
      if (current < 0) {
        childDataList.push(childData)
      } else {
        childDataList[current] = childData
      }
      handleClose()
    }
  }

  // 父表改动
  const onParentChange = (data) => (logic.onFieldChange(data, parentDataMap, container))

  // 子表改动
  const onChildChange = (data) => (logic.onFieldChange(data, childDataMap, container))

  // 打开详情表
  const handleDetail = (e, index) => {
    setCurrent(index)
    setChildDefaultValues(childDataList[index])
    openChildForm(index)
  }

  // 提交表单
  const handleSubmit = () => {
    const form = {
      processDefinitionId,
      formKey,
      childFormKey,
      parentData: map2object(parentDataMap),
      childDataList,
    }
    if (processDefinitionId) {
      // create
      API.create(form).then(() => {
        CommonTip.success('Success')
        history.push('/')
      })
    } else {
      // approve
      // TODO check pass, if pass then save and call ansable, else throw a error
      // API.check.then(({ data }) => {
      //   const resultList = data.data
      // })
    }
  }

  // 子表行内按钮列表
  const actionList = [
    { label: 'Detail', icon: <BorderColorIcon />, onClick: handleDetail },
  ]

  // 子表按钮
  const buttonList = [
    { id: 'save', label: 'Save', color: 'primary', onClick: handleSave, disabled: false },
    { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClose, disabled: false },
  ]

  return (
    <React.Fragment>
      <Paper ref={container}>
        <DIYForm
          htmlId={'DynamicParentForm'}
          dataList={parentFormDetail}
          formTitle={workflowName}
          onChange={onParentChange}
          defaultValues={parentDefaultValues}
        />
        <HATable
          id={'DynamicTable'}
          rows={childDataList}
          actionList={actionList}
          tableName={logic.getChildTableTitle && logic.getChildTableTitle()}
          headCells={tableHeader}
          fieldList={fieldList}
          addChild={openChildForm}
          marginTop={8}
        />
        <ChildForm
          id={'DynamicDialog'}
          open={open}
          formDetail={childFormDetail}
          defaultValues={childDefaultValues}
          onChange={onChildChange}
          childFormTitle={logic.getChildFormTitle && logic.getChildFormTitle()}
          buttonList={buttonList}
        />
        <ButtonGroup className={classes.buttonGroup}>
          <Button
            className={classes.button}
            variant="contained"
            color='primary'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </ButtonGroup>
      </Paper>
    </React.Fragment>
  )
}

export default CommonWorkflowForm
