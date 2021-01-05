import {isEmail, isHKPhone} from "../../regex"
import accountManagementAPI from "../../../api/accountManagement";

export function itemIsChecked(self, fieldName, itemName) {
  const itemID = getItemIDByItemName(self, fieldName, itemName)
  if (!itemID) return false
  const fieldValue = self.parentData.get(fieldName)
  return fieldValue.size && fieldValue.has(itemID)
}

export function getItemIDByItemName(self, fieldName, itemName) {
  const field = getFieldByFieldName(self, fieldName)
  if (!field || !field.itemList) return 0
  const targetList = field.itemList.filter(el => el.type === itemName)
  if (!targetList || !targetList.length) return 0
  const [ item ] = targetList
  return item.id
}

export function getItemNameByItemID(self, fieldName, ID) {
  const field = getFieldByFieldName(self, fieldName)
  if (!field || !field.itemList) return null
  const targetList = field.itemList.filter(el => el.id === ID)
  if (!targetList || !targetList.length) return null
  const [ item ] = targetList
  return item.type
}

export function getCheckedItemList(self, fieldName, value) {
  const checkedItemList = []
  value && value.forEach(id => {
    const type = getItemNameByItemID(self, fieldName, id)
    type && (checkedItemList.push(type))
  })
  return checkedItemList
}

export function getUncheckItemList(self, fieldName, value) {
  const field = getFieldByFieldName(self, fieldName)
  if (!field || !field.itemList) return []
  const unCheckItemList = []
  field.itemList.forEach(item => {
    if (!value.has(item.id)) {
      unCheckItemList.push(item.type)
    }
  })
  return unCheckItemList
}

export function getHideFieldList(self, remarkList) {
  return self.parentInitDetail.filter(el => {
    let flag = false
    if (remarkList.indexOf(el.remark) !== -1) flag = true
    if (flag) {
      el.show = false
    }
    return flag
  })
}

export function getFieldByFieldName(self, fieldName) {
  const target = self && self.parentInitDetail.filter(e => e.fieldName === fieldName)
  if (target) return target[0]
  return false
}

export function hideItem(self, remark) {
  const hiddenFieldList = []
  self.parentInitDetail.forEach(field => {
    if (field.remark === remark) {
      const element = document.getElementById('element_' + field.fieldName)
      element && (element.style.display = 'none')
      field.show = false
      hiddenFieldList.push(field.fieldName)
      if (field.type === 'checkbox') {
        field.itemList.forEach(item => {
          hideItem(self, item.type)
        })
      }
      clearItemValueByRemark(self, field)
    }
  })
  return hiddenFieldList
}

export function showItem(self, remark) {
  const shownFieldList = []
  self.parentInitDetail.forEach(field => {
    if (field.remark === remark) {
      const element = document.getElementById('element_' + field.fieldName)
      element && (element.style.display = 'block')
      field.show = true
      shownFieldList.push(field.fieldName)
      if (field.type === 'checkbox') {
        const checkedItemList = getCheckedItemList(self, 'apply_for_internet', self.parentData.get('apply_for_internet'))
        checkedItemList.forEach(checkedItem => {
          showItem(self, checkedItem)
        })
      }
    }
  })
  return shownFieldList
}

export function insertHeadLine(fieldName, text) {
  const id = 'element_' + fieldName
  const el = document.getElementById(id)
  let headline = document.getElementById("headline_" + text)
  if (headline) {
    headline.style.display = 'block'
  } else {
    headline = createElement(text)
    el.parentElement.insertBefore(headline, el)
  }
}

export function removeHeadline(headlineText) {
  const headline = document.getElementById("headline_" + headlineText)
  if (headline) {
    headline.style.display = 'none'
  }
}

export function getFieldListByRemark(self, remark) {
  const list = []
  self.parentInitDetail.forEach(field => {
    if (field.remark === remark) {
      list.push(field)
    }
  })
  return list
}

export function clearItemValueByRemark(self, remark) {
  const fieldNameList = getFieldListByRemark(self, remark)
  fieldNameList.forEach(field => {
    switch (field.type) {
      case 'input':
        self.parentData.set(field.fieldName, null)
        break
      default:
        self.parentData.set(field.fieldName, new Set())
    }
    if (field.type === 'checkbox') {
      field.itemList.forEach(item => {
        hideItem(self, item.type)
      })
    }
    uncheckField(field)
  })
}

export function uncheckField(field) {
  const id = 'checkbox_' + field.fieldName
  const checkboxList = document.querySelectorAll("input[id^=" + id + "]")
  checkboxList.forEach(checkbox => {
    checkbox.checked = false
  })
}

export function checkField(fieldName, itemName) {
  const id = 'checkbox_' + fieldName + '_' + itemName
  // const selectors = "input[id^=" + "'" + id + "'" + "]"
  const selectors = `input[id^='${id}']`
  const checkboxList = document.querySelectorAll(selectors)
  checkboxList.forEach(checkbox => {
    checkbox.checked = true
  })
}

/**
 *
 * @param {String} text
 * @return {Node} element
 */
export function createElement(text) {
  const el = document.createElement('div')
  el.id = "headline_" + text
  el.innerText = text + ":"
  el.style.width = '100%'
  el.style.marginBottom = '1em'
  el.style.fontSize = '1.8em'
  return el
}


// ======================================================
//                        字段验证
// ======================================================

export function commonCheck(self, field) {
  const { fieldName, required, show } = field
  let done = false
  let error = false
  let message = ''
  if (!show) {
    done = true
    self.parentFieldError.set(fieldName, null)
    return { error, message, done }
  }
  if (required && self.isEmpty(fieldName)) {
    message = getRequiredMessage(field)
    error = true
    done = true
    self.parentFieldError.set(fieldName, message)
    return { error, message, done }
  }
  if (!required && self.isEmpty(fieldName)) {
    self.parentFieldError.set(fieldName, null)
    done = true
    return { error, message, done }
  }
  return { error, message, done }
}

export function emailCheck(self, field) {
  const { fieldName } = field
  let done = false
  let error = false
  let message = ''
  const value = self.parentData.get(fieldName)
  if (!isEmail(value)) {
    error = true
    done = true
    message = 'Incorrect Email Address'
    self.parentFieldError.set(fieldName, message)
    return { error, message, done }
  }
  return { error, message, done }
}

export function emailCheckByFieldNameList(self, field, fieldNameList) {
  if (fieldNameList.indexOf(field.fieldName) !== -1) {
    return emailCheck(self, field)
  }
  return { error: false, message: '', done: false }
}

export async function loginCheck(self, field) {
  let error = false
  let message = ''
  let done = false
  const { fieldName } = field
  const value = self.parentData.get(fieldName)
  const { data } = await accountManagementAPI.getUsersByEmails({ emails: [ value ] })
  if (!data || !data.data || !data.data[0]) {
    error = true
    message = 'User never logged in'
    done = true
    self.parentFieldError.set(fieldName, message)
    return { error, message, done }
  }
  return { error, message, done }
}

export async function loginCheckByListNameList(self, field, fieldNameList) {
  if (fieldNameList.indexOf(field.fieldName) !== -1) {
    return await loginCheck(self, field)
  }
  return { error: false, message: '', done: false }
}

export async function emailAndLoginCheck(self, field) {
  const emailRes = emailCheck(self, field)
  if (emailRes.done) return emailRes
  return loginCheck(self, field)
}

export async function emailAndLoginCheckByFieldNameList(self, field, fieldNameList) {
  if (fieldNameList.indexOf(field.fieldName) !== -1) {
    return await emailAndLoginCheck(self, field)
  }
  return { error: false, message: '', done: false }
}

export function phoneCheck(self, field) {
  return HKNumberCheck(self, field, 'phone')
}

export function phoneCheckByFieldNameList(self, field, fieldNameList) {
  if (fieldNameList.indexOf(field.fieldName) !== -1) {
    return phoneCheck(self, field)
  }
  return { error: false, message: '', done: false }
}

export function faxCheck(self, field) {
  return HKNumberCheck(self, field, 'fax')
}

export function faxCheckByFieldNameList(self, field, fieldNameList) {
  if (fieldNameList.indexOf(field.fieldName) !== -1) {
    return faxCheck(self, field)
  }
  return { error: false, message: '', done: false }
}

export async function fieldCheck(self, field, fieldNameList) {
  const {
    emailFieldNameList,
    loginFieldNameList,
    emailAndLoginFieldNameList,
    phoneFieldNameList,
    faxFieldNameList
  } = fieldNameList
  const commonRes = commonCheck(self, field)
  if (commonRes.done) {
    return { error: commonRes.error, message: commonRes.message }
  }
  const emailRes = emailFieldNameList && emailFieldNameList.length && emailCheckByFieldNameList(self, field, emailFieldNameList)
  if (emailRes && emailRes.done) {
    return { error: emailRes.error, message: emailRes.message }
  }
  const loginRes = loginFieldNameList && loginFieldNameList.length && await loginCheckByListNameList(self, field, loginFieldNameList)
  if (loginRes && loginRes.done) {
    return { error: loginRes.error, message: loginRes.message }
  }
  const emailAndLoginRes = emailAndLoginFieldNameList && emailAndLoginFieldNameList.length && await emailAndLoginCheckByFieldNameList(self, field, emailAndLoginFieldNameList)
  if (emailAndLoginRes && emailAndLoginRes.done) {
    return { error: emailAndLoginRes.error, message: emailAndLoginRes.message }
  }
  const phoneRes = phoneFieldNameList && phoneFieldNameList && phoneCheckByFieldNameList(self, field, phoneFieldNameList)
  if (phoneRes && phoneRes.done) {
    return { error: phoneRes.error, message: phoneRes.message }
  }
  const faxRes = faxFieldNameList && faxFieldNameList && faxCheckByFieldNameList(self, field, faxFieldNameList)
  if (faxRes && faxRes.done) {
    return { error: faxRes.error, message: faxRes.message }
  }
  self.parentFieldError.set(field.fieldName, null)
  return { error: false, message: '' }
}

function HKNumberCheck(self, field, type = 'phone') {
  const { fieldName } = field
  let done = false
  let error = false
  let message = ''
  const value = self.parentData.get(fieldName)
  if (!isHKPhone(value)) {
    message = `Incorrect ${type} no`
    error = true
    done = true
    self.parentFieldError.set(fieldName, message)
    return { error, message, done }
  }
}

function getRequiredMessage(field) {
  return getFieldDisplayName(field) + "is required"
}

function getFieldDisplayName(field) {
  return field.fieldDisplayName.length > 40 ? field.fieldDisplayName.slice(0, 37) : field.fieldDisplayName
}
