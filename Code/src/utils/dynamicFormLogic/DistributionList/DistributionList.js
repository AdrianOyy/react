// import Api from "../../../api/accountManagement"
import ContractItems from "../../../components/ContractItems"
import CommonTip from "../../../components/CommonTip"

export default class DistributionList {
  // eslint-disable-next-line
  async onFieldChange(data, dataMap, ref) {
    const { id } = data
    dataMap.set(id, data)
  }

  // eslint-disable-next-line
  async checkChildForm(childDataMap) {
    return true
  }


  async checkForm(parentFormDetail, parentDataMap) {
    let pass = true
    // 验证必填字段
    const isowner = parentDataMap.get('isowner').label
    for (let i = 0; i < parentFormDetail.length; i++) {
      const { required, fieldName, fieldDisplayName } = parentFormDetail[i]
      if (required && (!parentDataMap.get(fieldName) || !parentDataMap.get(fieldName).value)
      ) {
        if ((fieldName.indexOf('isowner_') !== -1 && isowner === 'Yes')
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

  handleParentData(rawData, stepName, pageName, onCheck) {
    rawData && rawData.forEach(el => {
      if (stepName) {
        el.showOnRequest = true
      }
      switch (el.fieldName) {
        case 'supervisoremailaccount':
          el.isCheck = true
          el.onCheck = onCheck
          break
        case 'members':
          el.isCheck = true
          el.onCheck = onCheck
          break
        case 'memberof':
          el.isCheck = true
          el.onCheck = onCheck
          break
        case 'acceptmessagesfrom':
          el.isCheck = true
          el.onCheck = onCheck
          break
        case 'rejectmessagesfrom':
          el.isCheck = true
          el.onCheck = onCheck
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

  getReturnType(parentDataMap, fieldName) {
    let returnType = null
    switch (fieldName) {
      case 'supervisoremailaccount':
        returnType = 'user'
        break
      case 'members':
        returnType = 'user'
        break
      case 'memberof':
        returnType = 'distribution'
        break
      case 'acceptmessagesfrom':
        returnType = 'distribution'
        break
      case 'rejectmessagesfrom':
        returnType = 'distribution'
        break
      default:
        break
    }
    if ((!parentDataMap.get(fieldName) || !parentDataMap.get(fieldName).value)) {
      CommonTip.error('Check field is required')
      returnType = null
    }
    return returnType
  }

  getContractList() {
    const res = [ ContractItems.get('Distribution List Application') ]
    return res
  }
}

