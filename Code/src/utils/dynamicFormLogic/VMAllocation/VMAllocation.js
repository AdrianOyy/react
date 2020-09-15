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
          if (stepName != 't3') {
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
    const environment_type = childDataMap.get('environment_type') && childDataMap.get('environment_type').value
    const network_zone = childDataMap.get('network_zone') && childDataMap.get('network_zone').value
    const cpu_request_number = childDataMap.get('cpu_request_number') && childDataMap.get('cpu_request_number').value
    const ram_request_number = childDataMap.get('ram_request_number') && childDataMap.get('ram_request_number').value
    if (!environment_type) {
      CommonTip.error('Enviroment Type is required')
      return false
    }
    if (!network_zone) {
      CommonTip.error('Network Zone is required')
      return false
    }
    if (isNaN(parseInt(cpu_request_number))) {
      CommonTip.error('cpu only receive a integer')
      return false
    }
    if (isNaN(parseInt(ram_request_number))) {
      CommonTip.error('ram only receive a integer')
      return false
    }
    if (parseInt(ram_request_number) / parseInt(cpu_request_number) > 8) {
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

  getChildTableTitle() {
    return 'VM List'
  }

  getChildFormTitle() {
    return 'VM'
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
        {/* <div*/}
        {/*  style={{*/}
        {/*    display: 'flex',*/}
        {/*    justifyContent: 'space-between'*/}
        {/*  }}*/}
        {/* >*/}
        {/*  <div>*/}
        {/*    {'Justification: '}*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    { justification }*/}
        {/*  </div>*/}
        {/* </div>*/}
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
