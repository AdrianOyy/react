import CommonTip from "../../../components/CommonTip"
import formatDateTime from "../../formatDateTime"

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

  async checkDialog(values) {
    const { cpu_request_number, ram_request_number } = values
    if (isNaN(parseInt(cpu_request_number))) {
      CommonTip.err('cpu only receive a integer')
      return false
    }
    if (isNaN(parseInt(ram_request_number))) {
      CommonTip.err('ram only receive a integer')
      return false
    }
    if (parseInt(ram_request_number) / parseInt(cpu_request_number) > 8) {
      CommonTip.err('ram is 8 times larger than cpu')
      return false
    }
    return true
  }
}
