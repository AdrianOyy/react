import Api from "../../../api/accountManagement"
import ContractItems from "../../../components/ContractItems"
import CommonTip from "../../../components/CommonTip"
import { getUser } from "../../auth"

export default class NonPersonalAccount {
  // eslint-disable-next-line
  async onFieldChange(data, dataMap, ref, parentFormDetail) {
    const { id } = data
    switch (id) {
      case 'issame':
        issame(data, dataMap, parentFormDetail)
        break
      default:
        if (id) {
          dataMap.set(id, data)
        }
    }
  }

  // eslint-disable-next-line
  async checkChildForm(childDataMap) {
    return true
  }


  async checkForm(parentFormDetail, parentDataMap) {
    let pass = true
    // 验证必填字段
    const issame = parentDataMap.get('issame')
    for (let i = 0; i < parentFormDetail.length; i++) {
      const { required, fieldName, fieldDisplayName } = parentFormDetail[i]
      if (required && (!parentDataMap.get(fieldName) || !parentDataMap.get(fieldName).value)) {
        CommonTip.error(`${fieldDisplayName} is required`)
        pass = false
        break
      } if (fieldName === 'owneremail' && (!issame || issame.label !== 'Not the same') && (!parentDataMap.get(fieldName) || !parentDataMap.get(fieldName).value)) {
        CommonTip.error(`${fieldDisplayName} is required`)
        pass = false
        break
      }
    }
    if (pass) {
      const supervisoremailaccount = parentDataMap.get('supervisoremailaccount')
      if (supervisoremailaccount) {
        pass = await this.getUsersByEmails(supervisoremailaccount.value)
      }
    }
    return pass
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
  handleParentDefaultData(rawData) {
    return rawData
  }

  handleParentStartData(startData) {
    if (startData.start) {
      const user = getUser()
      const data = {
        surname: user.cn,
        firstname: user.sn,
        christianname: user.givenName,
      }
      return { parentStartData: data }
    } else {
      return { parentStartData: null }
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

  // eslint-disable-next-line no-unused-vars
  handleParentData(rawData, stepName, pageName, onCheck) {
    rawData && rawData.forEach(el => {
      if (stepName) {
        el.showOnRequest = true
      }
      switch (el.fieldName) {
        case 'supervisoremailaccount':
          el.title = 'Set Email Account'
          el.type = 'inputCheck'
          el.apiKey = Api.findUsers
          el.apiValue = { returnType: 'user' }
          break
        case 'alternaterecipient':
          el.title = 'Set Email Account or Distribution'
          el.type = 'inputCheck'
          el.apiKey = Api.findUsers
          el.apiValue = { returnType: 'userOrDistribution' }
          break
        case 'alreadyaddeddistributionlist':
          el.title = 'Set Distribution'
          el.type = 'dialogList'
          el.apiKey = Api.findUsers
          el.apiValue = { returnType: 'distribution' }
          break
        case 'acceptmessagesfrom':
          el.title = 'Set Email Account'
          el.type = 'dialogList'
          el.apiKey = Api.findUsers
          el.apiValue = { returnType: 'user' }
          break
        case 'rejectmessagesfrom':
          el.title = 'Set Email Account'
          el.type = 'dialogList'
          el.apiKey = Api.findUsers
          el.apiValue = { returnType: 'user' }
          break
        case 'emailid':
          if (stepName !== 'HA4Approval' && stepName !== 'detail') {
            el.required = false
            el.readable = false
          } else {
            el.title = 'Set Email Account'
            el.type = 'inputCheck'
            el.apiKey = Api.findUsers
            el.apiValue = { returnType: 'user' }
          }
          break
        case 'owneremail':
          el.title = 'Set Email Account'
          el.type = 'inputCheck'
          el.apiKey = Api.findUsers
          el.apiValue = { returnType: 'user' }
          break
        default:
          return rawData
      }
    })
    switch (stepName) {
      case 'T3':
        break
      default:
        return rawData
    }
  }

  beforeSubmit(dataMap) {
    return dataMap
  }

  getChildTableTitle() {
    return 'Child Table'
  }

  getChildFormTitle() {
    return 'Child'
  }

  setSupervisorEmail(value, dataMap, checkName) {
    dataMap.set(checkName, { id: checkName, label: value, value })
  }

  getContractList() {
    const res = [ ContractItems.get('CORP Account (Non-Personal) Application') ]
    return res
  }
}

function issame(data, dataMap, parentFormDetail) {
  const { id, value } = data
  dataMap.set(id, data)
  for (const detail of parentFormDetail) {
    if (detail.readable && detail.fieldName === 'owneremail') {
      const divlist = document.getElementById(detail.fieldName + '_div')
      if (value === 'Not the same') {
        divlist.style = 'display:none'
      } else {
        divlist.style = 'display:block'
      }
    }
  }
}
