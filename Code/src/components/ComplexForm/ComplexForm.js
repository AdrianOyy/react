import React from "react"
import CommonForm from "../CommonForm"
import {
  Paper,
  Divider
} from "@material-ui/core"
import styled from "styled-components"
import FormTable from "../FormTable"

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;
  width: 100%;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(6)}px;
  }
`

export default function ComplexForm(props) {
  const { moduleList } = props

  const formHandle = (module) => {
    const {
      title,
      titleLevel,
      formFieldList,
      onFormFieldChange,
      showBtn,
      onBtnClick,
      onFormFieldBlur,
      showHR
    } = module

    return (
      <React.Fragment>
        <CommonForm
          formTitle={title}
          titleLevel={titleLevel}
          formFieldList = {formFieldList}
          onFormFieldChange = {onFormFieldChange}
          showBtn = {showBtn}
          onBtnClick = {onBtnClick}
          onFormFieldBlur = {onFormFieldBlur}
        />
        {
          showHR && <Divider my={6} />
        }
      </React.Fragment>
    )
  }

  const tableHandle = (module) => {
    const {
      rows,
      title,
      titleLevel,
      handleDelete,
      headCells,
      fieldList,
      actionList,
      hideCreate,
      hideCheckBox,
      customCreate,
    } = module

    return (
      <React.Fragment>
        <FormTable
          rows={rows}
          title={title}
          titleLevel={titleLevel}
          handleDelete={handleDelete}
          headCells={headCells}
          fieldList={fieldList}
          actionList={actionList}
          hideCreate={hideCreate}
          hideCheckBox={hideCheckBox}
          customCreate={customCreate}
        />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Wrapper>
        {
          moduleList && moduleList.map((module, i) => {
            switch (module.type) {
              case 'form':
                return (
                  <div key={i + '__' + module.title} style={{ marginBottom: '5ch' }}>
                    {
                      formHandle(module)
                    }
                  </div>
                )
              case 'table':
                return (
                  <div  key={i + '__' + module.title} style={{ marginBottom: '5ch' }}>
                    {
                      tableHandle(module, i)
                    }
                  </div>
                )
              default:
                return <h1 key={i + 'other'}>other</h1>
            }
          })
        }
      </Wrapper>
    </React.Fragment>
  )
}
