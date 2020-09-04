import React from "react"
import ReactDOM from 'react-dom'
import HAInput from "../../../components/HAInput"
import CommonTip from "../../../components/CommonTip"
import formatDateTime from "../../formatDateTime"

import tenantAPI from '../../../api/tenant'

export default class VMAllocation {
  async onFormFieldChange(value, id, i, dataList) {
    console.log(dataList)
    console.log(i)
    if (dataList[i].type === 'date') {
      dataList[i].value = formatDateTime(value)
    } else {
      switch (id) {
        case 'tenant':
          dataList[i].value = value
          // eslint-disable-next-line no-case-declarations
          // const itemDetail = dataList[i].itemList.find(t => t.id === value)
          // for (let j = 0; j < dataList.length; j++) {
          //   if (j != i) {
          //     dataList[j].value = itemDetail[dataList[j].foreignKey]
          //     const ramInput = document.getElementById(dataList[j].id)
          //     ramInput.value = dataList[j].value
          //     const next = ramInput.nextElementSibling || ramInput.nextSibling
          //     const target = next.firstChild || next.firstElementChild
          //     target.style = "width: auto;height: 11px;display: block;padding: 0;font-size: 0.75em;max-width: 0.01px;text-align: left;transition: max-width 50ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;visibility: hidden;max-width: 1000px;transition: max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 50ms;"
          //     const ramLabel = document.getElementById(dataList[j].id + '-label')
          //     ramLabel.className = 'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-filled'
          //   }
          // }
          break
        default:
          dataList[i].value = value
      }
    }
  }

  async onDialogFieldChange(value, id, i, dataList) {
    console.log(id)
    console.log(dataList)
    console.log(value)
    if (dataList[i].type === 'date') {
      dataList[i].value = formatDateTime(value)
    } else {
      switch (id) {
        case 'cpu_request_number':
          dataList[i].value = parseInt(value)
          for (let j = 0; j < dataList.length; j++) {
            if (dataList[j].id === 'ram_request_number') {
              dataList[j].value = 8 * parseInt(value)
              const ramInput = document.getElementById('ram_request_number')
              ramInput.value = 8 * parseInt(value)
              const next = ramInput.nextElementSibling || ramInput.nextSibling
              const target = next.firstChild || next.firstElementChild
              target.style = "width: auto;height: 11px;display: block;padding: 0;font-size: 0.75em;max-width: 0.01px;text-align: left;transition: max-width 50ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;visibility: hidden;max-width: 1000px;transition: max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 50ms;"
              // target.className = 'jss508 jss509 PrivateNotchedOutline-legendLabelled-508 PrivateNotchedOutline-legendNotched-509'
              const ramLabel = document.getElementById('ram_request_number-label')
              // console.log(ramLabel)
              ramLabel.className = 'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-filled'
              break
            }
          }
          break
        default:
          dataList[i].value = value
      }
    }
  }

  async checkDialog(childFormData) {
    if (!childFormData) return false
    const { cpu_request_number, ram_request_number } = childFormData
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

  // =================================================
  //                     新方法
  // =================================================
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

  async checkChildForm(childDataMap) {
    const cpu_request_number = childDataMap.get('cpu_request_number') && childDataMap.get('cpu_request_number').value
    const ram_request_number = childDataMap.get('ram_request_number') && childDataMap.get('ram_request_number').value
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
  }
  dataMap.set(id, Object.assign(data, { error, helperText }))
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
      code, budget_type, justification, project_owner,
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
            {'Justification: '}
          </div>
          <div>
            { justification }
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
