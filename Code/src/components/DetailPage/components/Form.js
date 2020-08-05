import React from "react";

import {
  CardContent,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import styled from "styled-components";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const TextFieldSpacing = styled(MuiTextField)(spacing);
const TextField = styled(TextFieldSpacing)`width: 200px;`;

const Button = styled(MuiButton)(spacing);

function Form(props) {
  const {
    formTitle,
    formFieldList,
    onFormFieldChange,
    showBtn,
    onBtnClick,
    onFormFieldBlur,
  } = props
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          { formTitle }
        </Typography>
        <Paper mt={10}>
          <form noValidate autoComplete="off">
            {
              formFieldList && formFieldList.map((field, i) => (
                <TextField
                  id = { field.id }
                  key = {field.id + field.label}
                  label = { field.label}
                  type = {field.type}
                  error = {field.error || false}
                  helperText = {field.helperText || ''}
                  disabled = {field.disabled || false}
                  variant = "outlined"
                  required = {field.required || false}
                  onChange = { !field.readOnly ? (event) => onFormFieldChange(event, field.id) : null}
                  onBlur = {!field.readOnly ? () => onFormFieldBlur(field.id) : null}
                  value={ field.value }
                  InputProps={{
                    readOnly: field.readOnly
                  }}
                  m={8}
                />
              ))
            }
          </form>
        </Paper>
        {
            showBtn &&   (
              <div style={{display:'flex', justifyContent:'right'}}>
                <Button
                  mr={2}
                  variant="contained"
                  onClick={ (e) => onBtnClick() }>
                  Save
                </Button>
              </div>
            )
        }
      </CardContent>
    </Card>
  )
}

export default Form