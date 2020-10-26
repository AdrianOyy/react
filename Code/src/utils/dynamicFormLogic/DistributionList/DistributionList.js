import Api from "../../../api/accountManagement"
import ContractItems from "../../../components/ContractItems"
import CommonTip from "../../../components/CommonTip"

export default class DistributionList {
  // eslint-disable-next-line
  async onFieldChange(data, dataMap, ref) {
    const { id } = data
    if (id) {
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
    const isowner = parentDataMap.get('isowner')
    for (let i = 0; i < parentFormDetail.length; i++) {
      const { required, fieldName, fieldDisplayName } = parentFormDetail[i]
      if (required && (!parentDataMap.get(fieldName) || !parentDataMap.get(fieldName).value)
      ) {
        if ((fieldName.indexOf('isowner_') !== -1 && isowner && isowner.label === 'Yes')
          || fieldName.indexOf('isowner_') === -1) {
          CommonTip.error(`${fieldDisplayName} is required`)
          pass = false
          break
        }
      }
    }
    return pass
  }

  // 处理父表数据表
  handleParentDefaultData(rawData) {
    return rawData
  }

  handleParentStartData() {
    const data = {}
    return data
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
        case 'members':
          el.title = 'Set Email Account'
          el.type = 'dialogList'
          el.apiKey = Api.findUsers
          el.apiValue = { returnType: 'user' }
          break
        case 'memberof':
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
        case 'stafftype':
          if (el.itemList) {
            el.itemList.filter(_ => { return _.type !== 'Head Office(PYN)' })
          }
          break
        case 'ownerstafftype':
          if (el.itemList) {
            el.itemList.filter(_ => { return _.type !== 'Head Office(PYN)' })
          }
          break
        case 'distributionlistid':
          if (stepName !== 'HA4Approval') {
            el.required = false
            el.readable = false
          } else {
            el.title = 'Set Distribution'
            el.type = 'inputCheck'
            el.apiKey = Api.findUsers
            el.apiValue = { returnType: 'distribution' }
          }
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
    const res = [ ContractItems.get('Distribution List Application') ]
    return res
  }
}

