import { Common } from "../Common"
import Api from "../../../../api/diyForm"
import { object2map } from "../../../map2object"
import { DetailActions, UpdateActions } from "../../../../components/HADynamicForm/Components/Actions"
import { Button } from "@material-ui/core"
import { L } from "../../../lang"
import React from "react"
import { CREATE, UPDATE } from "../../../variable/stepName"
import { isEmail } from "../../../regex"
import accountManagementAPI from "../../../../api/accountManagement"


class Account extends Common {
  // 获取 checkBox 联动状态
  getCheckBoxStatus({ type, status }) {
    const res = new Map()
    if (!type) return res
    res.set(type, status)
    if (type === 'Internet Account Application' && status === -1) {
      res.set('IBRA Account Application', -1)
    }
    if (type === 'IBRA Account Application' && status === 1) {
      res.set('Internet Account Application', 1)
    }
    return res
  }

  shouldContinue(item) {
    if (this.stepName && this.stepName === CREATE && !item.showOnRequest) return true
    if (this.stepName && this.stepName !== CREATE && item.fieldName === 'hkid') return true
    return false
  }

  // 整合父表初始数据和结构
  getParentInitDetail(parentInitData) {
    if (!this.parentFormDetail || !this.parentFormDetail.length || !parentInitData) return []
    const res = []
    const remarkedItem = new Map()
    const atDefault = new Set()
    for (const item of this.parentFormDetail) {
      if (this.shouldContinue(item)) continue
      let defaultValue
      if (item && item.type === "checkbox") {
        defaultValue = parentInitData.get(item.fieldName) && parentInitData.get(item.fieldName).split('!@#')
      } else {
        defaultValue = parentInitData.get(item.fieldName)
      }
      if (item.fieldName === 'account_type') {
        defaultValue && defaultValue.forEach(d => {
          atDefault.add(d)
        })
      }
      const newItem = {
        ...item,
        show: true,
        defaultValue,
        disabled: this.disabledAllParent
      }
      if (newItem.remark) {
        newItem.show = false
        if (remarkedItem.has(newItem.remark)) {
          remarkedItem.set(remarkedItem.get(newItem.remark).push(newItem.fieldName))
        } else {
          remarkedItem.set(item.remark, [ newItem.fieldName ])
        }
      }
      res.push(newItem)
    }
    this.remarkedItem = remarkedItem
    const insertItemList = []
    atDefault && atDefault.forEach(at => {
      const insertItem = remarkedItem.get(at)
      insertItem && insertItemList.push(...insertItem)
    })
    res.forEach(el => {
      if (insertItemList.indexOf(el.fieldName) !== -1) {
        el.show = true
      }
    })
    this.parentInitDetail = res
    return res
  }

  // 父表字段变更
  onParentFieldChange(fieldName, value) {
    if (fieldName === 'account_type') {
      const showList = new Set()
      const [{ itemList }] = this.parentFormDetail.filter(e => e.fieldName === 'account_type')
      const fullId = new Set()
      itemList.forEach(e => {
        fullId.add(e.type)
        value.forEach(el => {
          if (e.id === el) {
            showList.add(e.type)
          }
        })
      })
      const hideList = new Set([ ...fullId ].filter(e => !showList.has(e)))
      const showFieldList = []
      const hideFieldList = []
      showList.forEach(checkboxName => {
        const t = this.remarkedItem.get(checkboxName)
        t && showFieldList.push(...t)
      })
      hideList.forEach(checkboxName => {
        const t = this.remarkedItem.get(checkboxName)
        t && hideFieldList.push(...t)
      })
      showFieldList.forEach(fieldName => {
        const id = 'element_' + fieldName
        const el = document.getElementById(id)
        el && (el.style.display = 'block')
      })
      hideFieldList.forEach(fieldName => {
        const id = 'element_' + fieldName
        const el = document.getElementById(id)
        el && (el.style.display = 'none')
      })
    }
    this.parentData.set(fieldName, value)
    return value
  }

  // 特殊字段验证(异步)
  async asyncCheck(field) {
    const { fieldName, required, fieldDisplayName, show } = field
    if (show && required && this.isEmpty(fieldName)) {
      const message = `${fieldDisplayName} is required`
      this.parentFieldError.set(fieldName, message)
      return { error: true, message }
    }
    if (fieldName === 'supervisoremailaccount') {
      if (!isEmail(this.parentData.get('supervisoremailaccount'))) {
        const message = 'Incorrect Email Address'
        this.parentFieldError.set(fieldName, message)
        return { error: true, message }
      }
      const { data } = await accountManagementAPI.getUsersByEmails({ emails: [ this.parentData.get('supervisoremailaccount') ] })
      if (!data || !data.data || !data.data[0]) {
        const message = 'User never logged in'
        this.parentFieldError.set(fieldName, message)
        return { error: true, message }
      }
    }
    return { error: false, message: '' }
  }
}

class AccountDetail extends Account {
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
    console.log('parentInitData=========================parentInitData')
    console.log(parentInitData)
    console.log('parentInitData=========================parentInitData')
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

class AccountUpdate extends Account {
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
}

export default async function getAccountLogic(props) {
  const { stepName } = props
  switch (stepName) {
    case CREATE:
      return new Account(props)
    case UPDATE:
      return new AccountUpdate(props)
    default:
      return new AccountDetail(props)
  }
}
