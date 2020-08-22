import dayjs from "dayjs"
import CommonTip from "../../../components/CommonTip"

const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
}


export default class VmAllocation {
  async onFormFieldChange(e, id, values) {
    const { value } = e.target
    for (let i = 0; i < values.length; i++) {
      if (values[i].id === id) {
        if (values[i].type === 'date') {
          values[i].value = formatDateTime(value)
        } else {
          // if (id === 'aa') {
          //   for (let j = 0; j < values.length; j++) {
          //     if (values[j].id === 'bb') {
          //       values[j].value = 8 + value
          //       break
          //     }
          //   }
          // }
          values[i].value = value
        }
      }
    }
    return values
  }

  async onDialogFieldChange(e, id, values) {
    const { value } = e.target
    for (let i = 0; i < values.length; i++) {
      if (values[i].id === id) {
        if (values[i].type === 'date') {
          values[i].value = formatDateTime(value)
        } else {
          if (id === 'cpu' && !isNaN(parseInt(value))) {
            for (let j = 0; j < values.length; j++) {
              if (values[j].id === 'ram') {
                values[j].value = 8 * parseInt(value)
                break
              }
            }
          }
          values[i].value = value
        }
      }
    }
    return values
  }

  async checkDialog(values) {
    const { cpu, ram } = values
    if (isNaN(parseInt(cpu))) {
      CommonTip.error('cpu only receive a integer')
      return false
    }
    if (isNaN(parseInt(ram))) {
      CommonTip.error('ram only receive a integer')
      return false
    }
    if (parseInt(ram) / parseInt(cpu) > 8) {
      CommonTip.error('ram is 8 times larger than cpu')
      return false
    }
    return true
  }
}
