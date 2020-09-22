import CommonTip from "../../../components/CommonTip"

export default class Common {
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

