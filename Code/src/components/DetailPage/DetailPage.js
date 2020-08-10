import React from "react"
import Form from './components/Form'

function DetailPage(props) {
  const {
    formTitle,
    formFieldList,
    onFormFieldChange,
    showBtn,
    onBtnClick,
    onFormFieldBlur,
  } = props
  return (
    <React.Fragment>
      <Form
        formTitle={formTitle}
        formFieldList = {formFieldList}
        onFormFieldChange = {onFormFieldChange}
        showBtn = {showBtn}
        onBtnClick = {onBtnClick}
        onFormFieldBlur = {onFormFieldBlur}
      />
    </React.Fragment>
  )
}

export default DetailPage
