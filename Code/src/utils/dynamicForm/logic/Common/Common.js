import React from "react"
import {
  Button,
} from "@material-ui/core"
import { CREATE, UPDATE } from "../../../variable/stepName"
import { cloneMap1 } from "../../../clone"
import { map2object, object2map } from "../../../map2object"
import {
  CommonActions,
  DetailActions,
  UpdateActions
} from "../../../../components/HADynamicForm/Components/Actions"
import VMStatus, { SUCCESS } from '../../../variable/VMStatus'
import Api from "../../../../api/diyForm"
import { L } from "../../../lang"

export class Common {
  // 构造函数
  constructor(props) {
    this.onParentFieldChange = this.onParentFieldChange.bind(this)
    this.onChildFieldChange = this.onChildFieldChange.bind(this)
    this.checkAllParentField = this.checkAllParentField.bind(this)
    this.checkParentField = this.checkParentField.bind(this)
    this.checkAllChildField = this.checkAllChildField.bind(this)
    this.checkChildField = this.checkChildField.bind(this)
    this.getCurrentChild = this.getCurrentChild.bind(this)
    this.saveChildForm = this.saveChildForm.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
    this.deleteChild = this.deleteChild.bind(this)
    this.deleteAllChild = this.deleteAllChild.bind(this)
    const {
      processDefinitionId,
      workflowName,
      version,
      stepName,
      formKey,
      childFormKey,
      parentFormDetail,
      childFormDetail,
      childHeaderLength,
      deploymentId,
      startData,
      pid,
      taskId,
    } = props
    this.parentChangedFidleList = []
    this.childChangedFidleList = []
    this.pid = pid
    this.taskId = taskId
    this.processDefinitionId = processDefinitionId
    this.deploymentId = deploymentId
    this.workflowName = workflowName
    this.version = version
    this.stepName = stepName
    this.parentFormKey = formKey
    this.childFormKey = childFormKey
    this.parentFormDetail = parentFormDetail
    this.childFormDetail = childFormDetail
    this.parentData = new Map()
    this.currentChildrenData = new Map()
    this.parentFieldError = new Map()
    this.childFieldError = new Map()
    this.childrenDataList = []
    this.startData = startData ? startData : {}
    this.childInitDetail = this.getChildInitDetail(-1)
    this.childHeaderCellList = this.getChildHeaderCellList(childHeaderLength)
    this.disabledAllParent = false
    this.disabledAllChild = false
    this.hideCheckBox = false
    this.hideDelete = false
    this.hideCreate = false
  }

  //  =====================================
  //                common
  //  =====================================

  // 获取初始化数据
  async getInitData() {
    return {}
  }

  // 插入 Dom
  insertDom() {}

  getFormData() {
    const parentData = map2object(this.parentData)
    this.formatFormData(parentData, true)
    const childDataList = []
    this.childrenDataList.forEach(el => {
      const childData = map2object(el)
      this.formatFormData(childData)
      delete childData['$handled']
      childDataList.push(childData)
    })
    const form = {
      pid: this.pid,
      taskId: this.taskId,
      processDefinitionId: this.processDefinitionId,
      formKey: this.parentFormKey,
      childFormKey: this.childFormKey,
      workflowName: this.workflowName,
      parentData,
      childDataList,
      version: this.version,
      deploymentId: this.deploymentId,
    }
    return form
  }

  getActions(history) {
    return (
      <CommonActions history={history} logic={this} />
    )
  }

  formatFormData(data, isParent = false) {
    for (let key in data) {
      data[key] = {
        id: key,
        value: data[key],
        label: isParent ? this.getParentLabelValue(key, data[key]) : this.getChildLabelValue(key, data[key])
      }
    }
  }


  //  =====================================
  //                 parent
  //  =====================================

  // 获取父表标题
  getParentTitle() {
    return this.parentFormKey
  }

  // 整合父表初始数据和结构
  getParentInitDetail(parentInitData) {
    if (!this.parentFormDetail || !this.parentFormDetail.length || !parentInitData) return []
    const res = []
    for (const item of this.parentFormDetail) {
      if (this.stepName && this.stepName === CREATE && !item.showOnRequest) continue
      const defaultValue = parentInitData.get(item.fieldName)
      const newItem = {
        ...item,
        defaultValue,
        disabled: this.disabledAllParent
      }
      res.push(newItem)
    }
    return res
  }

  // 父表字段数据变更
  onParentFieldChange(fieldName, value) {
    this.parentData.set(fieldName, value)
    return value
  }

  // 验证父表字段是否为空
  isEmpty(fieldName) {
    return !this.parentData.get(fieldName)
  }

  // 验证父表字段
  checkParentField(field) {
    const { fieldName, required, fieldDisplayName } = field
    if (required && this.isEmpty(fieldName)) {
      const message = `${fieldDisplayName} is required`
      this.parentFieldError.set(fieldName, message)
      return { error: true, message }
    }
    this.parentFieldError.set(fieldName, null)
    return { error: false, message: '' }
  }

  // 验证父表所有字段
  checkAllParentField() {
    for (let i = 0; i < this.parentFormDetail.length; i++) {
      const field = this.parentFormDetail[i]
      const { error } = this.checkParentField(field)
      if (error) {
        return false
      }
    }
    return true
  }

  // 获取父表显示用数据
  getParentLabelValue(fieldName, value) {
    if (!value) return value
    const [ field ] = this.parentFormDetail.filter(item => item.fieldName === fieldName)
    if (!field) return value
    const { valueField, labelField, itemList } = field
    if (!valueField || !labelField || !itemList) {
      return value
    }
    const [ targetItem ] = itemList.filter(el => el[valueField] + '' === value + '')
    if (!targetItem) return value
    return targetItem[labelField]
  }

  //  =====================================
  //                 child
  //  =====================================

  // 获取子表标题
  getChildFormTitle() {
    return 'child'
  }

  // 获取子表显示用数据
  getChildLabelValue(fieldName, value) {
    if (!value) return value
    const [ field ] = this.childFormDetail.filter(item => item.fieldName === fieldName)
    if (!field) return value
    if (fieldName === 'status') {
      const status = VMStatus[value]
      if (!status) return value
      return status.label
    }
    const { valueField, labelField, itemList } = field
    if (!valueField || !labelField || !itemList) {
      return value
    }
    const [ targetItem ] = itemList.filter(el => el[valueField] + '' === value + '')
    if (!targetItem) return value
    return targetItem[labelField]
  }

  // 获取子表表头字段
  getChildHeaderCellList(len = 5) {
    if (!this.childFormDetail || !this.childFormDetail.length) return []
    const res = []
    for (let i = 0; i <= len; i++) {
      const { fieldName, fieldDisplayName } = this.childFormDetail[i]
      res.push({
        id: fieldName,
        label: fieldDisplayName,
        alignment: 'left'
      })
    }
    return res
  }

  // 整合子表初始数据和结构
  getChildInitDetail(index, props) {
    const initData = this.getCurrentChild(index)
    this.currentChildrenData = initData
    const res = []
    const success = initData.get("status") === SUCCESS.value
    for (const item of this.childFormDetail) {
      if (this.stepName && this.stepName === CREATE && !item.showOnRequest) continue
      const defaultValue = initData.get(item.fieldName)
      const newItem = {
        ...item,
        defaultValue,
        disabled: success || this.disabledAllChild,
      }
      res.push(newItem)
    }
    return res
  }

  // 子表字段数据变更
  onChildFieldChange(fieldName, value) {
    this.currentChildrenData.set(fieldName, value)
  }

  // 验证子表字段
  checkChildField(field) {
    const { fieldName, required, displayName } = field
    if (required && this.isEmpty(fieldName)) {
      const message = `${displayName} is required`
      this.childFieldError.set(fieldName, message)
      return { error: true, message }
    } else {
      this.childFieldError.set(fieldName, null)
    }
    return { error: false, message: '' }
  }

  // 验证子表所有字段
  checkAllChildField() {
    for (let i = 0; i < this.childInitDetail.length; i++) {
      const { error } = this.checkChildField(this.childInitDetail[i])
      if (error) {
        return false
      }
    }
    return true
  }

  // 保存当前子表
  saveChildForm(index) {
    if (index < 0 || index >= this.childrenDataList.length) {
      this.childrenDataList.push(cloneMap1(this.currentChildrenData))
    } else {
      this.childrenDataList[index] = cloneMap1(this.currentChildrenData)
    }
    this.currentChildrenData.clear()
  }

  // 从子表列表获取子表数据
  getCurrentChild(index) {
    if (index < 0 || index >= this.childrenDataList.length) {
      return new Map()
    }
    return this.childrenDataList[index]
  }

  // 清空子表
  deleteAllChild() {
    this.childrenDataList = []
  }

  // 删除子表指定数据
  deleteChild(selected) {
    this.childrenDataList = this.childrenDataList.filter((_, i) => selected.indexOf(i) === -1)
  }


  // 获取子表表格标题
  getChildTableTitle() {
    return this.childFormKey
  }

  // 获取子表按钮
  getChildFormActions(props) {
    const { currentIndex, onClose } = props
    const handleSave = () => {
      const pass = this.checkAllChildField()
      if (pass) {
        this.saveChildForm(currentIndex)
        onClose()
      }
    }
    return (
      <>
        <Button
          color='primary'
          variant="contained"
          style={{
            width: '5vw',
            marginLeft: '1vw',
            marginRight: '1vw',
            color: '#fff',
          }}
          onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="contained"
          style={{
            width: '5vw',
            marginLeft: '1vw',
            marginRight: '1vw',
            color: '#333',
            backgroundColor: '#eee',
          }}
          onClick={onClose}>
          Cancel
        </Button>
      </>
    )
  }
}

export class CommonDetail extends Common {
  // 构造函数
  constructor(props) {
    super(props)
    this.disabledAllParent = true
    this.disabledAllChild = true
    this.hideCheckBox = true
    this.hideDelete = true
    this.hideCreate = true
  }
  // 整体
  async getInitData() {
    const { data } = await Api.detail({ deploymentId: this.deploymentId, pid: this.pid })
    const { parentData, childDataList } = data.data
    let parentInitData
    const childInitData = []
    if (parentData) {
      parentInitData = object2map(parentData)
    }
    if (childDataList && childDataList.length) {
      childDataList.forEach(childData => {
        childInitData.push(object2map(childData))
      })
    }
    return { parentInitData, childInitData, callback: this.insertDom.bind(this) }
  }

  getActions(history) {
    return (
      <DetailActions history={history} logic={this} />
    )
  }
  // parent


  // child
  getChildFormActions(props) {
    const { onClose } = props
    return (
      <>
        <Button
          variant="contained"
          style={{
            width: '5vw',
            marginLeft: '1vw',
            marginRight: '1vw',
            color: '#fff',
            backgroundColor: '#4CAF50',
          }}
          onClick={onClose}>
          {L('OK')}
        </Button>
      </>
    )
  }
}

export class CommonUpdate extends Common {
  // 构造函数
  constructor(props) {
    super(props)
    this.disabledAllParent = true
    this.disabledAllChild = true
    this.hideCheckBox = true
    this.hideDelete = true
    this.hideCreate = true
  }
  // 整体
  async getInitData() {
    const { data } = await Api.detail({ deploymentId: this.deploymentId, pid: this.pid })
    const { parentData, childDataList } = data.data
    let parentInitData
    const childInitData = []
    if (parentData) {
      parentInitData = object2map(parentData)
    }
    if (childDataList && childDataList.length) {
      childDataList.forEach(childData => {
        childInitData.push(object2map(childData))
      })
    }
    return { parentInitData, childInitData, callback: this.insertDom.bind(this) }
  }

  getActions(history) {
    return (
      <UpdateActions history={history} logic={this} />
    )
  }
  // parent


  // child
  getChildFormActions(props) {
    const { onClose } = props
    return (
      <>
        <Button
          variant="contained"
          style={{
            width: '5vw',
            marginLeft: '1vw',
            marginRight: '1vw',
            color: '#fff',
            backgroundColor: '#4CAF50',
          }}
          onClick={onClose}>
          {L('OK')}
        </Button>
      </>
    )
  }
}

export default function getCommon(props) {
  const { stepName } = props
  switch (stepName) {
    case CREATE:
      return new Common(props)
    case UPDATE:
      return new CommonUpdate(props)
    default:
      return new CommonDetail(props)
  }
}

