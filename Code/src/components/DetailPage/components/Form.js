import React from "react";

import {
  CardContent,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
  Grid
} from "@material-ui/core";

import CommonSelect from "../../CommonSelect";

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
              formFieldList && formFieldList.map((field, i) => field.isSelector ? (
                  <CommonSelect
                    id = {field.id}
                    key = {field.id + field.label}
                    label = { field.label}
                    error = {field.error || false}
                    helperText = {field.helperText || ''}
                    value={ field.value }
                    itemList={field.itemList}
                    onSelectChange = { (event) => onFormFieldChange(event, field.id) }
                  />

                ):
                (
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
                    mt={1}
                    mr={8}
                    ml={8}
                  />
                )
              )
            }
          </form>
        </Paper>
        {
            showBtn &&   (
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={ (e) => onBtnClick() }>
                  Save
                </Button>
              </Grid>
            )
        }
      </CardContent>
    </Card>
  )
}

export default Form