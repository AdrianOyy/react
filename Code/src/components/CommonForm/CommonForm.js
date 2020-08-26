import React from "react"

import {
  CardContent,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
  Grid,
  Switch
} from "@material-ui/core"

// import CommonSelect from "../CommonSelect"

import { spacing } from "@material-ui/system"
import styled from "styled-components"
import { KeyboardDatePicker } from "@material-ui/pickers"
import CommonSelect from "../CommonSelect"

const Card = styled(MuiCard)(spacing)
const Paper = styled(MuiPaper)(spacing)
const TextFieldSpacing = styled(MuiTextField)(spacing)
const TextField = styled(TextFieldSpacing)`width: 200px;`

const Button = styled(MuiButton)(spacing)

function CommonForm(props) {
  const {
    formTitle,
    titleLevel,
    formFieldList,
    onFormFieldChange,
    showBtn,
    onBtnClick,
    onFormFieldBlur,
    spacing,
  } = props
  const handleDataChange = (value, id) => {
    const data = {
      target: {
        value
      }
    }
    onFormFieldChange(data, id)
  }
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant={titleLevel ? `h${titleLevel}` : 'h2'} gutterBottom>
          { formTitle }
        </Typography>
        <Paper mt={0}>
          <form noValidate autoComplete="off">
            <Grid container spacing={spacing ? spacing : 3}>
              {
                formFieldList && formFieldList.map((field, i) => {
                  switch (field.type) {
                    case 'text':
                      return (
                        <TextField
                          id={field.id.toString()}
                          key={field.id + field.label}
                          label={field.label}
                          type={field.type}
                          error={field.error || false}
                          helperText={field.helperText || ''}
                          disabled={field.disabled || false}
                          variant="outlined"
                          required={field.required || false}
                          onChange={!field.readOnly ? (event) => onFormFieldChange(event, field.id) : null}
                          onBlur={!field.readOnly && onFormFieldBlur ? (e) => onFormFieldBlur(e, field.id) : null}
                          value={field.value}
                          InputProps={{
                            readOnly: field.readOnly
                          }}
                          InputLabelProps={{
                            shrink: field.type === 'date' ? true : undefined
                          }}
                          style={{ marginTop: "5ch", marginRight: "10ch" }}
                        />
                      )
                    case 'date':
                      return (
                        <KeyboardDatePicker
                          clearable='true'
                          variant="inline"
                          inputVariant="outlined"
                          key = {field.id + field.label}
                          views={field.views ? field.views : undefined}
                          format={field.views ? 'yyyy' : 'yyyy / MM / dd'}
                          label = {field.label}
                          error = {field.error || false}
                          helperText = {field.helperText || ''}
                          value = {field.value === '' ? null : field.value}
                          style={{ marginTop: "5ch", marginRight: "10ch" }}
                          readOnly = {field.readOnly}
                          onChange = {handleDataChange && ((event) => handleDataChange(event, field.id))}
                        />
                      )
                    case 'boolean':
                      return  (
                        <Switch
                          checked={field.value}
                          onChange={(event) => handleDataChange(event, field.id)}
                          color="primary"
                          key = {field.id + field.label}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                          style={{ marginTop: "5ch", marginRight: "10ch" }}
                        />
                      )
                    case 'select':
                      return  (
                        <CommonSelect
                          id = {field.id.toString()}
                          key = {field.id + field.label}
                          label = {field.label}
                          error = {field.error || false}
                          helperText = {field.helperText || ''}
                          value={field.value || ''}
                          disabled={field.disabled || false}
                          outlined={true}
                          itemList={field.itemList}
                          labelField={field.labelField}
                          valueField={field.valueField}
                          width={field.width}
                          labelWidth={field.labelWidth}
                          hasMt={true}
                          onSelectChange={!field.readOnly ? (event) => onFormFieldChange(event, field.id) : null}
                        />
                      )
                    default:
                      return (
                        <TextField
                          id={field.id}
                          key={field.id + field.label}
                          label={field.label}
                          type={field.type}
                          error={field.error || false}
                          helperText={field.helperText || ''}
                          disabled={field.disabled || false}
                          variant="outlined"
                          required={field.required || false}
                          onChange={!field.readOnly ? (event) => onFormFieldChange(event, field.id) : null}
                          onBlur={!field.readOnly && onFormFieldBlur ? (e) => onFormFieldBlur(e, field.id) : null}
                          value={field.value}
                          InputProps={{
                            readOnly: field.readOnly
                          }}
                          InputLabelProps={{
                            shrink: field.type === 'date' ? true : undefined
                          }}
                          style={{ marginTop: "5ch", marginRight: "10ch" }}
                        />
                      )
                  }
                })
              }
            </Grid>
          </form>
        </Paper>
        {
          showBtn &&   (
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={{ marginTop: '5ch' }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={() => onBtnClick()}>
                Save
              </Button>
            </Grid>
          )
        }
      </CardContent>
    </Card>
  )
}

export default CommonForm
