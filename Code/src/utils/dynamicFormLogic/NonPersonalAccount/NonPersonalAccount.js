// import Api from "../../../api/accountManagement"
import ContractItems from "../../../components/ContractItems"
import CommonTip from "../../../components/CommonTip"

export default class NonPersonalAccount {
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
      console.log(el)
      switch (el.fieldName) {
        case 'supervisoremailaccount':
          el.isCheck = true
          el.onCheck = onCheck
          break
        case 'alternaterecipient':
          el.isCheck = true
          el.onCheck = onCheck
          break
        case 'alreadyaddeddistributionlist':
          el.isCheck = true
          el.onCheck = onCheck
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
      case 'alternaterecipient':
        returnType = 'userOrDistribution'
        break
      case 'alreadyaddeddistributionlist':
        returnType = 'distribution'
        break
      default:
        break
    }
    if ((!parentDataMap.get(fieldName) || !parentDataMap.get(fieldName).value)) {
      CommonTip.error('E-mail Address is required')
      returnType = null
    }
    return returnType
  }

  getContractList() {
    const res = [ ContractItems.get('CORP Account (Non-Personal) Application') ]
    return res
  }
}
