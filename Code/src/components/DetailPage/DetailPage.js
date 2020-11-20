import React from "react"
import CommonForm from '../CommonForm'


function DetailPage(props) {
  const {
    // formTitle,
    formFieldList,
    errorFieldList,
    onFormFieldChange,
    showBtn,
    onBtnClick,
    onFormFieldBlur,
  } = props

  return (
    <React.Fragment>
      <CommonForm
        // formTitle={formTitle}
        formTitle = ''
        formFieldList = {formFieldList}
        errorFieldList = {errorFieldList}
        onFormFieldChange = {onFormFieldChange}
        showBtn = {showBtn}
        onBtnClick = {onBtnClick}
        onFormFieldBlur = {onFormFieldBlur}
      />
    </React.Fragment>
  )
}

export default DetailPage
