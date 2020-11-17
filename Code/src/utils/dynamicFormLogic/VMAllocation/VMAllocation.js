import React from "react"
import ReactDOM from 'react-dom'
import CommonTip from "../../../components/CommonTip"

import tenantAPI from '../../../api/tenant'

export default class VMAllocation {
  async onFieldChange(data, dataMap, ref) {
    const { id } = data
    switch (id) {
      case 'tenant':
        await handleTenantChange(data, ref)
        dataMap.set(id, data)
        break
      case 'cpu_request_number':
        checkCPU(data, dataMap)
        break
      default:
        dataMap.set(id, data)
    }
  }

  getChildFormData(childDate, stepName) {
    for (const data of childDate) {
      const { fieldName } = data
      switch (fieldName) {
        case 'platform':
          // eslint-disable-next-line no-case-declarations
          if (stepName !== 't3') {
            const itemList = data.itemList.filter(t => t.name === "Windows")
            data.itemList = itemList
          }
          continue
        default:
          continue
      }
    }
    return childDate
  }

  async checkChildForm(childDataMap) {
    const cpu_request_number = childDataMap.get('cpu_request_number') && childDataMap.get('cpu_request_number').value
    const ram_request_number = childDataMap.get('ram_request_number') && childDataMap.get('ram_request_number').value
    if (ram_request_number && cpu_request_number && parseInt(ram_request_number) / parseInt(cpu_request_number) > 8) {
      CommonTip.error('ram is 8 times larger than cpu')
      return false
    }
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

  // 处理父表渲染表
  handleParentData(rawData, stepName) {
    rawData && rawData.forEach(el => {
      if (stepName) {
        el.showOnRequest = true
      }
    })
    switch (stepName) {
      default:
        return rawData
    }
  }

  handleParentStartData() {
    const parentStartData = {
      tenant: 1,
      justification: 'test'
    }
    const childStartData = {
      application_type: 3,
      backup_volume: "test",
      cpu_request_number: "1",
      data_storage_request_number: "800",
      environment_type: 3,
      network_zone: 3,
      phase: "test11",
      platform: 1,
      ram_request_number: 8,
    }
    return { parentStartData, childStartData: [ childStartData ] }
  }

  beforeSubmit(dataMap) {
    return dataMap
  }

  // 处理子表渲染表
  handleChildData(rawData, stepName, pageName) {
    rawData && rawData.forEach(el => {
      if (stepName) {
        el.showOnRequest = true
      }
    })
    switch (stepName) {
      case 'T3':
        return rawData
      default:
        return handleStartChildTableData(rawData)
    }
  }

  // 获取子表表头字段
  getHeaderList(childDataMap, stepName) {
    const list = [
      {
        id: childDataMap.get("platform").fieldName,
        label: childDataMap.get("platform").fieldDisplayName,
        align: 'center'
      },
      {
        id: childDataMap.get("cpu_request_number").fieldName,
        label: childDataMap.get("cpu_request_number").fieldDisplayName,
        align: 'center'
      },
      {
        id: childDataMap.get("ram_request_number").fieldName,
        label: childDataMap.get("ram_request_number").fieldDisplayName,
        align: 'center'
      },
      {
        id: childDataMap.get("data_storage_request_number").fieldName,
        label: childDataMap.get("data_storage_request_number").fieldDisplayName,
        align: 'center'
      },
    ]
    if (stepName && stepName !== 'teamManager') {
      list.push({
        id: childDataMap.get("status").fieldName,
        label: childDataMap.get("status").fieldDisplayName,
        align: 'center'
      })
    }
    return list
  }

  // 获取子表每行显示数据
  getFieldList(childDataMap, stepName) {
    const list = [
      {
        field: childDataMap.get("platform").fieldName,
        align: 'center'
      },
      {
        field: childDataMap.get("cpu_request_number").fieldName,
        align: 'center'
      },
      {
        field: childDataMap.get("ram_request_number").fieldName,
        align: 'center'
      },
      {
        field: childDataMap.get("data_storage_request_number").fieldName,
        align: 'center'
      },
    ]
    if (stepName && stepName !== 'teamManager') {
      list.push({
        id: childDataMap.get("status").fieldName,
        align: 'center'
      })
    }
    return list
  }

  // 处理父表数据表
  handleParentDefaultData(rawData, stepName) {
    return rawData
  }

  // 处理子表数据表
  handleChildDefaultData(rawData, childDataListMap) {
    const childList = []
    if (!rawData || !rawData.length) return childList
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

  getChildTableTitle() {
    return 'VM List'
  }

  getChildFormTitle() {
    return 'VM'
  }

  getContractList() {
    return false
  }
}

function checkCPU(data, dataMap) {
  const { id, value } = data
  let error = false
  let helperText = ''

  if (isNaN(parseInt(value))) {
    error = true
    helperText = "CPU only receive a integer"
  } else {
    dataMap.set(id, Object.assign(data, { error, helperText }))
    dataMap.set('ram_request_number', {
      id: 'ram_request_number',
      label: parseInt(value) * 8,
      value: parseInt(value) * 8,
      error: false,
      helperText: '',
    })
    const ram = document.getElementById('ram_request_number')
    ram.value = parseInt(value) * 8
  }

}

async function handleTenantChange(tenantData) {
  const { value } = tenantData
  const { data }  = await tenantAPI.detail(value)
  const tenant = data.data

  const parentForm = document.getElementById('DynamicParentForm')
  const oldChild = document.getElementById('dynamicDiv')
  if (oldChild) {
    ReactDOM.unmountComponentAtNode(parentForm)
  }
  if (tenant) {
    const {
      code, budget_type, project_owner,
      contact_person, project_estimation, methodology_text
    } = tenant

    const node = (
      <div
        id={'dynamicDiv'}
        style={{
          marginTop: '1vh',
          width: '100%',
          marginBottom: '1vh',
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {'Code: '}
          </div>
          <div>
            { code }
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {'Budget Type: '}
          </div>
          <div>
            { budget_type }
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {'Project Owner: '}
          </div>
          <div>
            { project_owner }
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {'Contact Person: '}
          </div>
          <div>
            { contact_person }
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {'Project Estimation: '}
          </div>
          <div>
            { project_estimation }
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {'Methodology Text: '}
          </div>
          <div>
            { methodology_text }
          </div>
        </div>
      </div>
    )

    ReactDOM.render(node, parentForm)
    // parentForm.appendChild(node)
  }
}

function handleStartChildTableData(rawData) {
  for (let i = 0; i < rawData.length; i++) {
    switch (rawData[i].fieldName) {
      case 'platform':
        rawData[i].itemList = handlePlatForm(rawData[i].itemList).itemList
        break
      default:
    }
  }
  return rawData
}

function handlePlatForm(itemList) {
  const handledItemList = []
  for (let i = 0; i < itemList.length; i++) {
    if (itemList[i].name === "Windows") {
      handledItemList.push(itemList[i])
    }
  }
  return {
    itemList: handledItemList
  }
}
