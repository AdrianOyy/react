import CommonTip from "../../../components/CommonTip"
import formatDateTime from "../../formatDateTime"

export default class VMAllocation {
  async onFormFieldChange(value, id, i, dataList) {
    if (dataList[i].type === 'date') {
      dataList[i].value = formatDateTime(value)
    } else {
      switch (id) {
        default:
          dataList[i].value = value
      }
    }
  }

  async onDialogFieldChange(value, id, i, dataList) {
    if (dataList[i].type === 'date') {
      dataList[i].value = formatDateTime(value)
    } else {
      switch (id) {
        case 'CPURequestNumber':
          dataList[i].value = parseInt(value)
          for (let j = 0; j < dataList.length; j++) {
            if (dataList[j].id === 'RAMRequestNumber') {
              dataList[j].value = 8 * parseInt(value)
              const ramInput = document.getElementById('RAMRequestNumber')
              ramInput.value = 8 * parseInt(value)
              const next = ramInput.nextElementSibling || ramInput.nextSibling
              const target = next.firstChild || next.firstElementChild
              target.className = 'PrivateNotchedOutline-legendLabelled-508 PrivateNotchedOutline-legendNotched-509'
              const ramLabel = document.getElementById('RAMRequestNumber-label')
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

  checkDialog(values) {
    const { CPURequestNumber, RAMRequestNumber } = values
    if (isNaN(parseInt(CPURequestNumber))) {
      CommonTip.error('cpu only receive a integer')
      return false
    }
    if (isNaN(parseInt(RAMRequestNumber))) {
      CommonTip.error('ram only receive a integer')
      return false
    }
    if (parseInt(RAMRequestNumber) / parseInt(CPURequestNumber) > 8) {
      CommonTip.error('ram is 8 times larger than cpu')
      return false
    }
  }
}
