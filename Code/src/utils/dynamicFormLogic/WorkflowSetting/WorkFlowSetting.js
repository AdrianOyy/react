import CommonTip from "../../../components/CommonTip"

export default class WorkFlowSetting {
  // eslint-disable-next-line
  async onFieldChange(data, dataMap, ref) {
    const { id } = data
    switch (id) {
      case 'inputType':
        checkInputType(data, dataMap)
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
    let putValue = ''
    // 验证必填字段
    for (let i = 0; i < parentFormDetail.length; i++) {
      const { required, fieldName, fieldDisplayName } = parentFormDetail[i]
      if (fieldName === 'inputType') {
        putValue = 'select'
      }
      if (required && (!parentDataMap.get(fieldName) || !parentDataMap.get(fieldName).value)) {
        if (putValue === 'select' && (fieldName === 'foreignTable' || fieldName === 'foreignKey' || fieldName === 'foreignDisplayKey')) {
          CommonTip.error(`${fieldDisplayName} is required`)
          pass = false
          break
        } else if (fieldName !== 'foreignTable' && fieldName !== 'foreignKey' && fieldName !== 'foreignDisplayKey') {
          CommonTip.error(`${fieldDisplayName} is required`)
          pass = false
          break
        }
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

  getContractList() {
    return false
  }
}

function checkInputType(data, dataMap) {
  const { id, value } = data
  const foreignTable = document.getElementById('foreignTable')
  const foreignKey = document.getElementById('foreignKey')
  const foreignDisplayKey = document.getElementById('foreignDisplayKey')
  const foreignTablelabel = document.getElementById('foreignTablelabel')
  const foreignKeylabel = document.getElementById('foreignKeylabel')
  const foreignDisplayKeylabel = document.getElementById('foreignDisplayKeylabel')
  if (value === 'select' || value === 'checkbox') {
    foreignTable.style = 'display:block'
    foreignKey.style = 'display:block'
    foreignDisplayKey.style = 'display:block'
    foreignTablelabel.style = 'display:block'
    foreignKeylabel.style = 'display:block'
    foreignDisplayKeylabel.style = 'display:block'
  } else {
    foreignTable.style = 'display:none'
    foreignKey.style = 'display:none'
    foreignDisplayKey.style = 'display:none'
    foreignTablelabel.style = 'display:none'
    foreignKeylabel.style = 'display:none'
    foreignDisplayKeylabel.style = 'display:none'
  }
  dataMap.set(id, data)
}
