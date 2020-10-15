import CommonTip from "../../../components/CommonTip"
import Api from "../../../api/accountManagement"
import ContractItems from "../../../components/ContractItems"
import { encryption } from "../../encryption"

export default class AccountManagement {
  // eslint-disable-next-line
  async onFieldChange(data, dataMap, ref) {
    const { id } = data
    switch (id) {
      case 'account_type':
        accountType(data, dataMap)
        break
      default:
        dataMap.set(id, data)
    }
  }

  // eslint-disable-next-line
  async checkChildForm(childDataMap) {
    return true
  }

  async checkForm(parentFormDetail, parentDataMap) {
    let pass = true
    const account_type = parentDataMap.get('account_type').value
    // 验证必填字段
    for (let i = 0; i < parentFormDetail.length; i++) {
      const { required, fieldName, fieldDisplayName } = parentFormDetail[i]
      if (required && (!parentDataMap.get(fieldName) || !parentDataMap.get(fieldName).value) && accountRequired(account_type, fieldName)) {
        CommonTip.error(`${fieldDisplayName} is required`)
        pass = false
        break
      }
    }
    if (pass) {
      const distribution_list = parentDataMap.get('distribution_list')
      if (distribution_list) {
        pass = await this.userExistsMany(distribution_list.value)
      }
      if (pass) {
        const supervisoremailaccount = parentDataMap.get('supervisoremailaccount')
        if (supervisoremailaccount) {
          pass = await this.getUsersByEmails(supervisoremailaccount.value)
        }
      }
    }
    return pass
  }

  async userExistsMany(users) {
    if (users) {
      const usernames = users.split(',')
      return new Promise(function(reslove, reject) {
        Api.userExistsMany({ usernames }).then(({ data }) => {
          let pass = true
          const results = data.data
          for (const index in results) {
            if (!results[index]) {
              pass = false
              CommonTip.error(`Already added Distribution List ${usernames[index]} is not found`)
            }
          }
          if (pass) {
            reslove(true)
          } else {
            reject(false)
          }
        })
      })
    } else {
      return true
    }
  }

  async getUsersByEmails(email) {
    if (email) {
      const emails = email.split(',')
      return new Promise(function(reslove, reject) {
        Api.checkUsers({ emails }).then(({ data }) => {
          let pass = true
          const results = data.data
          for (const index in results) {
            if (!results[index]) {
              pass = false
              CommonTip.error(`Supervisor Email Account ${emails[index]} is not found`)
            }
          }
          if (pass) {
            reslove(true)
          } else {
            reject(false)
          }
        })
      })
    } else {
      return true
    }
  }

  // 处理父表数据表
  handleParentDefaultData(rawData, stepName) {
    return rawData
  }

  beforeSubmit(dataMap) {
    const hkid = dataMap.get('hkid')
    hkid.value = encryption(hkid.value)
    hkid.label = encryption(hkid.label)
  }

  handleParentStartData(startData) {
    if (startData.start) {
      const data = {
        account_type: 'Internet Account Application',
        surname: 'rexshen',
        apply_for: 'LAN account (LoginID)  and/or',
        contact_phone_no: '1358458751',
        division: 'devericd',
        firstname: 'shen',
        jobtitle: 'IT',
        officefax: '35854519',
        section: 'ie',
        stafftype: 'Head Office',
        supervisoremailaccount: 'rexshen@apjcorp.com',
      }
      return data
    } else {
      return null
    }
  }

  // 处理子表数据表
  handleChildDefaultData(rawData, childDataListMap) {
    const childList = []
    for (let i = 0; i < rawData.length; i++) {
      const el = rawData[i]
      const childModel = {}
      for (let key in el) {
        const child = childDataListMap.get(key)
        if (key === 'id') {
          const model = {
            id: 'id',
            value: el[key],
            label: el[key],
          }
          Object.assign(childModel, { id: model })
          Object.assign(childModel, { checkState: false })
        } else {
          if (!child) continue
          const model = {
            id: child.fieldName,
            value: child.type === 'select' ? child.itemList.find(t => t[child.valueField].toString() === el[key].toString())[child.valueField] : el[key],
            label: child.type === 'select' ? child.itemList.find(t => t[child.valueField].toString() === el[key].toString())[child.labelField] : el[key],
          }
          Object.assign(childModel, { [child.fieldName]: model })
        }
      }
      childList.push(childModel)
    }
    return childList
  }

  handleParentData(rawData, stepName, pageName, onCheck) {
    rawData && rawData.forEach(el => {
      if (stepName) {
        el.showOnRequest = true
      }
      switch (el.fieldName) {
        case 'account_type':
          el.selectChange = selectChange
          el.itemList.forEach(t => {
            if (t.type === 'CORP Account (Personal) Application') {
              t.disabled = true
            }
          })
          break
        case 'supervisoremailaccount':
          el.isCheck = true
          el.onCheck = onCheck
          break
        case 'hkid':
          if (stepName !== 'create') {
            el.readable = false
          }
          break
        case 'internet_email_alias':
          el.display = true
          break
        case 'internet_email_display_name':
          el.display = true
          break
        case 'user_name':
          el.display = true
          break
        case 'owa_hospital_web':
          el.display = true
          break
        case 'clinical_applications':
          el.display = true
          break
        case 'nonclinical_applications':
          el.display = true
          break
        case 'authenticationmethod':
          el.display = true
          break
        case 'mobile_phone_no_for_receipt_of_sms_otp':
          el.display = true
          break
        default:
          el.display = false
          break
      }
    })
    switch (stepName) {
      case 'T3':
        break
      default:
        return rawData
    }
  }

  getChildTableTitle() {
    return 'Child Table'
  }

  getChildFormTitle() {
    return 'Child'
  }

  setSupervisorEmail(value, dataMap) {
    dataMap.set('supervisoremailaccount', { id: 'supervisoremailaccount', label: value, value })
  }

  checkSupervisorEmail(parentDataMap) {
    let pass = true
    if ((!parentDataMap.get('supervisoremailaccount') || !parentDataMap.get('supervisoremailaccount').value)) {
      CommonTip.error('Supervisor Email Account is required')
      pass = false
    }
    return pass
  }

  async getEmail(parentDataMap) {
    return new Promise(function(reslove) {
      Api.findUsers({ email: parentDataMap.get('supervisoremailaccount').value }).then(({ data }) => {
        console.log(data)
        const results = data.data
        reslove(results)
      })
    })
  }

  getContractList(parentData) {
    const typeListString = parentData.get('account_type')
    if (!typeListString || !typeListString.value) return false
    const typeList = typeListString.value.split(',')
    if (typeList.length === 0) return false
    const res = []
    res.push(ContractItems.get('CORP Account (Personal) Application'))
    typeList.forEach(el => {
      const model = ContractItems.get(el)
      if (model) {
        res.push(model)
      }
    })
    return res
  }
}

function accountRequired(account_type, fieldName) {
  let required = true
  const internet = account_type.indexOf('Internet Account Application') > -1
  const ibra = account_type.indexOf('IBRA Account Application') > -1
  switch (fieldName) {
    case 'internet_email_alias':
      required = internet
      break
    case 'internet_email_display_name':
      required = internet
      break
    case 'ha_internet_account':
      required = ibra
      break
    case 'user_name':
      required = ibra
      break
    case 'owa_hospital_web':
      required = ibra
      break
    case 'clinical_applications':
      required = ibra
      break
    case 'nonclinical_applications':
      required = ibra
      break
    case 'authenticationmethod':
      required = ibra
      break
    case 'mobile_phone_no_for_receipt_of_sms_otp':
      required = ibra
      break
    default:
      required = true
      break
  }
  return required
}

// function onCheck(id) {
//   const alias = document.getElementById('supervisoremailaccount')
//   alias.value = 'dsfaf111111111111'
//   alert('ttttttttttttttttttttttttttttt')
// }

function selectChange(name, checked, data) {
  if (name === 'IBRA Account Application' && checked) {
    data['Internet Account Application'] = true
  } else if (name === 'Internet Account Application' && !checked) {
    data['IBRA Account Application'] = false
  }
}

function accountType(data, dataMap) {
  const { id, value } = data
  dataMap.set(id, data)
  // eslint-disable-next-line no-empty
  const alias_div = document.getElementById('internet_email_alias_div')
  const display_name_div = document.getElementById('internet_email_display_name_div')
  if (value.indexOf('Internet Account Application') > -1) {
    alias_div.style = 'display:block'
    display_name_div.style = 'display:block'
  } else {
    alias_div.style = 'display:none'
    display_name_div.style = 'display:none'
  }
  const User_Name = document.getElementById('user_name_div')
  const OWA_Webmail_Hospital_home_page = document.getElementById('owa_hospital_web_div')
  const Clinical_Applications = document.getElementById('clinical_applications_div')
  const NonClinical_Applications = document.getElementById('nonclinical_applications_div')
  const AuthenticationMethod = document.getElementById('authenticationmethod_div')
  const Mobile_Phone_No_for_Receipt_of_SMS_OTP = document.getElementById('mobile_phone_no_for_receipt_of_sms_otp_div')

  if (value.indexOf('IBRA Account Application') > -1) {
    User_Name.style = 'display:block'
    OWA_Webmail_Hospital_home_page.style = 'display:block'
    Clinical_Applications.style = 'display:block'
    NonClinical_Applications.style = 'display:block'
    AuthenticationMethod.style = 'display:block'
    Mobile_Phone_No_for_Receipt_of_SMS_OTP.style = 'display:block'
  } else {
    User_Name.style = 'display:none'
    OWA_Webmail_Hospital_home_page.style = 'display:none'
    Clinical_Applications.style = 'display:none'
    NonClinical_Applications.style = 'display:none'
    AuthenticationMethod.style = 'display:none'
    Mobile_Phone_No_for_Receipt_of_SMS_OTP.style = 'display:none'
  }
}
