import CommonTip from "../../../components/CommonTip"

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
    // 验证必填字段
    for (let i = 0; i < parentFormDetail.length; i++) {
      const { required, fieldName, fieldDisplayName } = parentFormDetail[i]
      if (required && (!parentDataMap.get(fieldName) || !parentDataMap.get(fieldName).value)) {
        CommonTip.error(`${fieldDisplayName} is required`)
        pass = false
        break
      }
    }
    return pass
  }

  // 处理父表数据表
  handleParentDefaultData(rawData, stepName) {
    return rawData
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

  handleParentData(rawData, stepName, pageName) {
    rawData && rawData.forEach(el => {
      if (stepName) {
        el.showOnRequest = true
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
}

function accountType(data, dataMap) {
  const { id, value } = data
  dataMap.set(id, data)
  // eslint-disable-next-line no-empty
  const alias_div = document.getElementById('Internet_Email_alias_div')
  const display_name_div = document.getElementById('Internet_Email_display_name_div')
  if (value.indexOf('Internet Account Application') > -1) {
    alias_div.style = 'display:block'
    display_name_div.style = 'display:block'
  } else {
    alias_div.style = 'display:none'
    display_name_div.style = 'display:none'
  }
  const HA_Internet_Account = document.getElementById('HA_Internet_Account_div')
  const User_Name = document.getElementById('User_Name_div')
  const OWA_Webmail_Hospital_home_page = document.getElementById('OWA_Webmail_Hospital_home_page_div')
  const Clinical_Applications = document.getElementById('Clinical_Applications_div')
  const NonClinical_Applications = document.getElementById('NonClinical_Applications_div')
  const AuthenticationMethod = document.getElementById('AuthenticationMethod_div')
  const Mobile_Phone_No_for_Receipt_of_SMS_OTP = document.getElementById('Mobile_Phone_No_for_Receipt_of_SMS_OTP_div')

  if (value.indexOf('IBRA Account Application') > -1) {
    HA_Internet_Account.style = 'display:block'
    User_Name.style = 'display:block'
    OWA_Webmail_Hospital_home_page.style = 'display:block'
    Clinical_Applications.style = 'display:block'
    NonClinical_Applications.style = 'display:block'
    AuthenticationMethod.style = 'display:block'
    Mobile_Phone_No_for_Receipt_of_SMS_OTP.style = 'display:block'
  } else {
    HA_Internet_Account.style = 'display:none'
    User_Name.style = 'display:none'
    OWA_Webmail_Hospital_home_page.style = 'display:none'
    Clinical_Applications.style = 'display:none'
    NonClinical_Applications.style = 'display:none'
    AuthenticationMethod.style = 'display:none'
    Mobile_Phone_No_for_Receipt_of_SMS_OTP.style = 'display:none'
  }
}
