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

const applicant = document.createElement("div")
applicant.id = "headLine_applicant's_particulars"
applicant.innerText = "Applicant's Particulars:"
applicant.style.width = '100%'
applicant.style.marginBottom = '1em'
// applicant.style.marginTop = '1em'
applicant.style.fontSize = '1.8em'

const manager = document.createElement("div")
manager.id = "headLine_manager's_Information"
manager.innerText = "Manager's Information:"
manager.style.width = '100%'
manager.style.marginBottom = '1em'
// applicant.style.marginTop = '1em'
manager.style.fontSize = '1.8em'


class Account extends Common {

  async insertHeadLine() {
    const surname = document.getElementById("element_surname")
    surname && surname.parentElement.insertBefore(applicant, surname)
    const supervisoremailaccount = document.getElementById("element_supervisoremailaccount")
    supervisoremailaccount && supervisoremailaccount.parentElement.insertBefore(manager, supervisoremailaccount)
  }

  preParentInitDetail(parentInitDetail) {
    // 增加placeholder，修改check按钮显示为Add
    parentInitDetail.map(_ => {
      if (_.fieldName === 'surname') {
        _.placeholder = 'Example: CHAN'
      } else if (_.fieldName === 'firstname') {
        _.placeholder = 'Example : Tai Man [should be same as that on HKID card]'
      } else if (_.fieldName === 'hkid') {
        _.placeholder = 'Example : A1234567'
      } else if (_.fieldName === 'distribution_list') {
        _.buttonText = 'Add'
      }
      return _
    })
  }

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
      if (hideType.indexOf(remark) !== -1
          && (!accountType || !accountType.defaultValue || !accountType.defaultValue.includes(remark))) {
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
    const parentInitData = new Map()
    parentInitData.set('owa_hospital_web', 'OWA Webmail + Hospital home page')
    parentInitData.set('apply_for_internet', 'Internet web access!@#Internet Email address')
    if (!cuId) return { parentInitData }
    const cuDatas = JSON.parse('{"account_type":"Internet Account Application!@#IBRA Account Application","surname":"rexshen","apply_for":"LAN account (LoginID)  and/or","contact_phone_no":"1358458751","division":"devericd","firstname":"shen","jobtitle":"IT","officefax":"35854519","section":"ie","stafftype":"Head Office","supervisoremailaccount":"rexshen@apjcorp.com"}')
    parentInitData.set('account_type', cuDatas.account_type)
    parentInitData.set('surname', cuDatas.surname)
    parentInitData.set('apply_for', cuDatas.apply_for)
    parentInitData.set('contact_phone_no', cuDatas.contact_phone_no)
    parentInitData.set('division', cuDatas.division)
    parentInitData.set('firstname', cuDatas.firstname)
    parentInitData.set('jobtitle', cuDatas.jobtitle)
    parentInitData.set('officefax', cuDatas.officefax)
    parentInitData.set('section', cuDatas.section)
    parentInitData.set('stafftype', cuDatas.stafftype)
    parentInitData.set('supervisoremailaccount', cuDatas.supervisoremailaccount)
    // parentInitData.set('account_type', 'Internet Account Application')
    // parentInitData.set('surname', 'rexshen')
    // parentInitData.set('apply_for', 'LAN account (LoginID)  and/or')
    // parentInitData.set('contact_phone_no', '1358458751')
    // parentInitData.set('division', 'devericd')
    // parentInitData.set('firstname', 'shen')
    // parentInitData.set('jobtitle', 'IT')
    // parentInitData.set('officefax', '35854519')
    // parentInitData.set('section', 'ie')
    // parentInitData.set('stafftype', 'Head Office')
    // parentInitData.set('supervisoremailaccount', 'rexshen@apjcorp.com')
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
    return this.stepName && this.stepName !== CREATE && item.fieldName === 'hkid'
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
        if (fieldName === "owa_hospital_web") {
          let headLine = document.getElementById("headLine_Profile Required")
          if (headLine) {
            headLine.style.display = 'block'
          } else {
            headLine = document.createElement("div")
            headLine.id = "headLine_Profile Required"
            headLine.innerText = "Profile Required:"
            headLine.style.width = '100%'
            headLine.style.marginBottom = '1em'
            headLine.style.marginTop = '1em'
            headLine.style.fontSize = '1.8em'
            el.parentElement.insertBefore(headLine, el)
          }
        }
      })
      hideFieldList.forEach(fieldName => {
        const id = 'element_' + fieldName
        const [ item ] = this.parentInitDetail.filter(e => e.fieldName === fieldName)
        item.show = false
        const el = document.getElementById(id)
        if (fieldName === "owa_hospital_web") {
          const headLine = document.getElementById("headLine_Profile Required")
          if (headLine) {
            headLine.style.display = 'none'
          }
        }
        el && (el.style.display = 'none')
      })
    } else if (fieldName === 'existing_corp_account') {
      const el_hkid = document.getElementById('element_hkid')
      const el_apply_for = document.getElementById('element_apply_for')
      if (value) {
        this.parentInitDetail.map(e => {
          if (e.fieldName === 'hkid') {
            e.required = false
          } else if (e.fieldName === 'apply_for') {
            e.required = false
          }
          return e
        })
        el_hkid && (el_hkid.style.display = 'none')
        el_apply_for && (el_apply_for.style.display = 'none')
      } else {
        this.parentInitDetail.map(e => {
          if (e.fieldName === 'hkid') {
            e.required = true
          } else if (e.fieldName === 'apply_for') {
            e.required = true
          }
          return e
        })
        el_hkid && (el_hkid.style.display = 'block')
        el_apply_for && (el_apply_for.style.display = 'block')
      }
    }
    this.parentData.set(fieldName, value)
    return value
  }

  // 特殊字段验证(异步)
  async asyncCheck(field) {
    const { fieldName, required, fieldDisplayName, show } = field
    if (!show) {
      this.parentFieldError.set(fieldName, null)
      return { error: false, message: '' }
    }
    if (required && this.isEmpty(fieldName)) {
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
    this.parentFieldError.set(fieldName, null)
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
