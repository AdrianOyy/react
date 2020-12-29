import { Common } from "../Common"
import Api from "../../../../api/diyForm"
import { object2map } from "../../../map2object"
import { DetailActions, UpdateActions } from "../../../../components/HADynamicForm/Components/Actions"
import { Button } from "@material-ui/core"
import { L } from "../../../lang"
import React from "react"
import { CREATE, UPDATE } from "../../../variable/stepName"
import { isEmail, isHKPhone } from "../../../regex"
import accountManagementAPI from "../../../../api/accountManagement"
import ContractItems from "../../../../components/ContractItems/ContractItems"


class Account extends Common {

  hideItem() {
    const hideFieldList = this.parentInitDetail.filter(el => {
      const flag = el.remark === 'Internet Account Application' || el.remark === 'IBRA Account Application'
      if (flag) {
        el.show = false
      }
      return flag
    })
    const [ accountType ] = this.parentInitDetail.filter(e => e.fieldName === 'account_type')
    let hideType = []
    if (accountType && accountType.itemList) {
      if (accountType.itemList.indexOf('Internet Account Application') === -1) hideType.push('Internet Account Application')
      if (accountType.itemList.indexOf('IBRA Account Application') === -1) hideType.push('IBRA Account Application')
    }
    hideFieldList.forEach(el => {
      const { fieldName, remark } = el
      if (hideType.indexOf(remark) !== -1) {
        const id = 'element_' + fieldName
        const el = document.getElementById(id)
        el && (el.style.display = 'none')
      }
    })
  }

  getContractList() {
    let res = [ ContractItems.get('CORP Account (Personal) Application') ]
    const atValueList = this.parentData.get('account_type')
    const [ atItem ] = this.parentInitDetail.filter(e => e.fieldName === 'account_type')
    if (!atItem || !atItem.itemList) return res

    atValueList.forEach(el => {
      const [ item ] = atItem.itemList.filter(e => e.id === el)
      if (item && item.type) {
        const contract = ContractItems.get(item.type)
        contract && res.push(contract)
      }
    })
    return res
  }

  async getInitData() {
    const { cuId } = this.startData
    if (!cuId) return {}
    const parentInitData = new Map()
    parentInitData.set('account_type', 'Internet Account Application')
    parentInitData.set('surname', 'rexshen')
    parentInitData.set('apply_for', 'LAN account (LoginID)  and/or')
    parentInitData.set('contact_phone_no', '1358458751')
    parentInitData.set('division', 'devericd')
    parentInitData.set('firstname', 'shen')
    parentInitData.set('jobtitle', 'IT')
    parentInitData.set('officefax', '35854519')
    parentInitData.set('section', 'ie')
    parentInitData.set('stafftype', 'Head Office')
    parentInitData.set('supervisoremailaccount', 'rexshen@apjcorp.com')
    return { parentInitData }
  }
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

  getParentTitle() {
    if (this.stepName === CREATE) return null
    return 'Account Management'
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
        const [ item ] = this.parentInitDetail.filter(e => e.fieldName === fieldName)
        item.show = true
        const el = document.getElementById(id)
        el && (el.style.display = 'block')
      })
      hideFieldList.forEach(fieldName => {
        const id = 'element_' + fieldName
        const [ item ] = this.parentInitDetail.filter(e => e.fieldName === fieldName)
        item.show = false
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
      const message = fieldDisplayName.length > 40 ? 'This field is required' : `${fieldDisplayName} is required`
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
    if (fieldName === 'contact_phone_no' || fieldName === 'mobile_phone_no_for_receipt_of_sms_otp') {
      if (!isHKPhone(this.parentData.get(fieldName))) {
        const message = 'Incorrect phone no'
        this.parentFieldError.set(fieldName, message)
        return { error: true, message }
      }
    }
    if (fieldName === 'officefax') {
      if (!isHKPhone(this.parentData.get(fieldName))) {
        const message = 'Incorrect fax address'
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
