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
              target.style = "width: auto;height: 11px;display: block;padding: 0;font-size: 0.75em;max-width: 0.01px;text-align: left;transition: max-width 50ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;visibility: hidden;max-width: 1000px;transition: max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 50ms;"
              // target.className = 'jss508 jss509 PrivateNotchedOutline-legendLabelled-508 PrivateNotchedOutline-legendNotched-509'
              const ramLabel = document.getElementById('RAMRequestNumber-label')
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
