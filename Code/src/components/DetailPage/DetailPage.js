import React from "react"
import {NaviHeader} from "../index"
import Form from './components/Form'

function DetailPage(props) {
  const {
    breadcrumbsList,
    formTitle,
    formFieldList,
    onFormFieldChange,
    showBtn,
    onBtnClick,
    onFormFieldBlur,
  } = props
  return (
    <React.Fragment>
      <NaviHeader breadcrumbsList={ breadcrumbsList } />
      <Form
        formTitle={ formTitle }
        formFieldList = { formFieldList }
        onFormFieldChange = { onFormFieldChange }
        showBtn = { showBtn }
        onBtnClick = { onBtnClick }
        onFormFieldBlur = { onFormFieldBlur }
      />
    </React.Fragment>
  )
}

export default DetailPage
