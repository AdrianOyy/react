import React, { memo } from "react"
import { Input, Select, SearchInput, CheckBox, SearchList, DatePicker } from "../Components/controless"
import formatField from "../../../utils/formatField"

const MemoInput = memo(Input)
const MemoSelect = memo(Select)
const MemoSearchInput = memo(SearchInput)
const MemoCheckBox = memo(CheckBox)
const MemoSearchList = memo(SearchList)
const MemoDatePicker = memo(DatePicker)

const switchComponent = (el, i, logic, style, isParent) => {
  const field = formatField(el)
  switch (field.type) {
    case 'select':
      return (
        <MemoSelect
          key={field.id + '_' + i}
          {...field}
          onChange={logic ? (isParent ? logic.onParentFieldChange : logic.onChildFieldChange) : undefined}
          checkField={logic ? (isParent ? logic.checkParentField : logic.checkChildField) : undefined}
          style={style[field.fieldName] ? style[field.fieldName] : style.commonElement}
        />
      )
    case 'checkbox':
      return (
        <MemoCheckBox
          key={field.id + '_' + i}
          {...field}
          getCheckBoxStatus={logic ? logic.getCheckBoxStatus : undefined}
          onChange={logic ? (isParent ? logic.onParentFieldChange : logic.onChildFieldChange) : undefined}
          checkField={logic ? (isParent ? logic.checkParentField : logic.checkChildField) : undefined}
          style={style[field.fieldName] ? style[field.fieldName] : style.commonElement}
        />
      )
    case 'inputCheck':
      return (
        <MemoSearchInput
          key={field.id + '_' + i}
          {...field}
          onBlur={logic ? (isParent ? logic.onParentFieldChange : logic.onChildFieldChange) : undefined}
          checkField={logic ? (isParent ? logic.checkParentField : logic.checkChildField) : undefined}
          asyncCheck={logic ? logic.asyncCheck : undefined}
          style={style[field.fieldName] ? style[field.fieldName] : style.commonElement}
        />
      )
    case 'list':
      return (
        <MemoSearchList
          key={field.id + '_' + i}
          {...field}
          onChange={logic ? (isParent ? logic.onParentFieldChange : logic.onChildFieldChange) : undefined}
          asyncCheck={logic ? logic.asyncCheck : undefined}
          style={style[field.fieldName] ? style[field.fieldName] : style.commonElement}
        />
      )
    case 'date':
      return (
        <MemoDatePicker
          key={field.id + '_' + i}
          {...field}
          onChange={logic ? (isParent ? logic.onParentFieldChange : logic.onChildFieldChange) : undefined}
          asyncCheck={logic ? logic.asyncCheck : undefined}
          style={style[field.fieldName] ? style[field.fieldName] : style.commonElement}
        />
      )
    default:
      return (
        <MemoInput
          key={field.id + '_' + i}
          {...field}
          asyncCheck={logic ? logic.asyncCheck : undefined}
          onBlur={logic ? (isParent ? logic.onParentFieldChange : logic.onChildFieldChange) : undefined}
          checkField={logic ? (isParent ? logic.checkParentField : logic.checkChildField) : undefined}
          style={style[field.fieldName] ? style[field.fieldName] : style.commonElement}
        />
      )
  }

}

export default switchComponent
